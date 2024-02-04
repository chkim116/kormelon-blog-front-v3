import IndexLayout from '@features/index/components/IndexLayout';
import { IndexUserImage } from '@features/index/components/IndexUserImage';
import { IndexUserMenu } from '@features/index/components/IndexUserMenu';

export default function IndexPage() {
  return (
    <IndexLayout>
      <IndexUserImage />
      <IndexUserMenu />
    </IndexLayout>
  );
}
