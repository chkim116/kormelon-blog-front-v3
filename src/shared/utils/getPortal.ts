export function getPortal() {
  try {
    let portal = document.getElementById('toast') as HTMLElement;

    if (!portal) {
      portal = document.createElement('div');
      portal.id = 'toast';
      document.body.append(portal);
    }

    return portal;
  } catch (err) {
    //
  }
}
