import { Metadata } from 'next';
import { toBlogPostDetailModel, createMetaData } from '@domain/manipulates';
import { repo } from '@server/repo';
import {
  BlogDetailCommentClientContainer,
  BlogDetailContentClientContainer,
  BlogDetailNearPostContainer,
  BlogDetailRecommendPostContainer,
} from '@app/blog/containers/detail';

export const dynamicParams = true;

interface BlogDetailParams {
  id: number;
}

export interface BlogDetailPageProps {
  params: BlogDetailParams;
}

export async function generateStaticParams() {
  const {
    data: { payload: posts },
  } = await repo.post.fetchPosts({ per: 1000 });

  return posts.map((post) => post.id);
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { post } = await repo.post
    .fetchPostById(Number(params.id))
    .then(({ data: { payload } }) => payload);

  return createMetaData({
    url: `https://www.kormelon.com/blog/${post.id}`,
    image: post.thumbnail,
    description: post.preview,
    title: post.title,
  });
}

async function fetchBlogDetail(params: BlogDetailParams) {
  const { post, next, prev } = await repo.post
    .fetchPostById(Number(params.id))
    .then(({ data: { payload } }) => payload);

  return {
    post: toBlogPostDetailModel(post),
    nearPost: { next, prev },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const props = await fetchBlogDetail(params);

  return (
    <>
      <BlogDetailContentClientContainer post={props.post} />
      <BlogDetailCommentClientContainer />
      <BlogDetailNearPostContainer nearPost={props.nearPost} />
      <BlogDetailRecommendPostContainer />
    </>
  );
}
