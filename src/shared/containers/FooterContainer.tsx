import { Divider } from '@nextui-org/divider';
import { unstable_noStore } from 'next/cache';
import { NAV_BAR_MENU_ITEM_LIST } from '@shared/constants/navbar.const';
import { NavbarIconList } from '@shared/components/NavbarIconList';
import { NavbarMenuLink } from '@shared/components/NavbarMenuLink';
import { actSharedViewLoad } from '@shared/actions/sharedView.action';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FooterContainerProps {}

export default async function FooterContainer(_: FooterContainerProps) {
  unstable_noStore();
  const { data: view } = await actSharedViewLoad();

  return (
    <footer className="w-full p-6 flex flex-col items-center justify-center gap-2 ">
      <Divider />

      <ul className="flex gap-4 my-6">
        {NAV_BAR_MENU_ITEM_LIST.map(({ href, isExternal, label }) => (
          <li key={href}>
            <NavbarMenuLink
              href={href}
              className="text-md"
              isExternal={isExternal}
              label={label}
              isActive={false}
            />
          </li>
        ))}
      </ul>

      <NavbarIconList />

      <div className="text-sm mt-6">&copy; kimchanghoe 2023</div>
      <div className="text-xs">
        {view.today} / {view.total}
      </div>
    </footer>
  );
}
