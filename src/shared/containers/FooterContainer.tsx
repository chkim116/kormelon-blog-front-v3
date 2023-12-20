import { actSharedViewLoad } from '@shared/actions/sharedView.action';
import { FooterContainerClient } from './FooterContainer.client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FooterContainerProps {}

export const dynamic = 'force-dynamic';

export async function FooterContainer(_: FooterContainerProps) {
  const { data: view } = await actSharedViewLoad();
  return <FooterContainerClient view={view} />;
}
