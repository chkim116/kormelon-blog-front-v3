import { IndexUserImage, IndexUserMenu } from '../components';

export const IndexBioContainer = () => (
  <div className="p-6 sm:p-12 md:p-20 gap-6 flex flex-col items-center text-center">
    <h1 className="text-4xl font-bold mb-12">Bio Links</h1>
    <IndexUserImage />
    <IndexUserMenu />
  </div>
);
