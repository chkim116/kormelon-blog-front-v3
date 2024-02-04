import { unstable_noStore } from 'next/cache';
import { actSharedNotificationLoad } from '@shared/actions/sharedNoti.action';
import { NavbarNotificationMenu } from '@shared/components/NavbarNotificationMenu';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NotificationsContainerProps {}

export default async function NotificationsContainer(
  _: NotificationsContainerProps,
) {
  unstable_noStore();
  const { data } = await actSharedNotificationLoad();

  return <NavbarNotificationMenu notifications={data} />;
}
