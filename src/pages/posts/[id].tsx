import { GetStaticPaths, GetStaticProps } from 'next';
import { repo } from '@core/repo';
import { PostDetailPage } from '@features/posts/routes/PostDetailPage';
import { toPostDetailModel } from '@features/posts/manipulates/post.convert';

export default PostDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { payload: posts },
  } = await repo.post.fetchPosts({ per: 1000 });

  return {
    paths: posts.map((post) => ({ params: { id: String(post.id) } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const params = ctx.params as Record<'id', string>;

  const { post, next, prev } = await repo.post
    .fetchPostById(Number(params.id))
    .then(({ data: { payload } }) => payload);

  return {
    props: {
      post: toPostDetailModel(post),
      postNear: {
        next,
        prev,
      },
    },
  };
};
