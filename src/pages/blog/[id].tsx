import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { repo } from '@core/repo';
import { BlogPostDetailResultEntityPayload } from '@core/entities';
import { PageSeo } from '@common/head';
import { toBlogPostDetailModel } from '@features/blog/manipulates';

const BlogPostDetailPage = dynamic(
  () =>
    import('@features/blog/routes/BlogPostDetailPage').then(
      ({ BlogPostDetailPage }) => BlogPostDetailPage,
    ),
  {
    ssr: false,
  },
);

export default function Page({
  post,
  next,
  prev,
}: BlogPostDetailResultEntityPayload) {
  const props = {
    post: toBlogPostDetailModel(post),
    postNear: {
      next,
      prev,
    },
  };

  return (
    <>
      <PageSeo
        url={`https://www.kormelon.com/blog/${post.id}`}
        image={post.thumbnail}
        desc={post.preview}
        title={post.title}
      />
      <BlogPostDetailPage {...props} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { payload: posts },
  } = await repo.post.fetchPosts({ per: 1000 });

  return {
    paths: posts.map((post) => ({ params: { id: String(post.id) } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const params = ctx.params as Record<'id', string>;

  const { post, next, prev } = await repo.post
    .fetchPostById(Number(params.id))
    .then(({ data: { payload } }) => payload);

  return {
    props: {
      post,
      next,
      prev,
    },
    revalidate: 60,
  };
};
