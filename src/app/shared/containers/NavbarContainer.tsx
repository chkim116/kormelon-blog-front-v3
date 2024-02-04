import { actSharedCheckUser } from 'src/app/shared/actions/sharedAuth.action';
import { actSharedNotificationLoad } from 'src/app/shared/actions/sharedNoti.action';
import { NotificationSearchUiState } from '@domain/notification/notification.uiState';
import { NavbarContainerClient } from './NavbarContainer.client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavbarContainerProps {}

export const dynamic = 'force-dynamic';

export default async function NavbarContainer(_: NavbarContainerProps) {
  const { data: user } = await actSharedCheckUser();

  let notifications: NotificationSearchUiState[] = [];

  if (user.id) {
    const { data } = await actSharedNotificationLoad();

    notifications = data;
  }

  return <NavbarContainerClient user={user} notifications={notifications} />;
}
