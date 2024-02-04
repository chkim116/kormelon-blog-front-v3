import NavbarContainer from '@shared/containers/NavbarContainer';
import NotificationsContainer from '@shared/containers/NotificationsContainer';

export default async function NavbarPage() {
  return <NavbarContainer notificationsComp={<NotificationsContainer />} />;
}
