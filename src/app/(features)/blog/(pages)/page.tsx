import {
  BlogSearchPostClientContainer,
  BlogSearchPostPaginationClientContainer,
} from '../containers/search';

export default async function BlogSearchPage() {
  return (
    <>
      <BlogSearchPostClientContainer />
      <BlogSearchPostPaginationClientContainer />
    </>
  );
}
