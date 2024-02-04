'use client';
import { Divider } from '@nextui-org/react';
import { ViewUiState } from '@shared/domains/view/view.uiState';
import { NAV_BAR_MENU_ITEM_LIST } from '@shared/constants/navbar.const';
import { NavbarIconList } from './NavbarIconList';
import { NavbarMenuLink } from './NavbarMenuLink';

interface LayoutFooterProps {
  view: ViewUiState;
}

export function Footer({ view }: LayoutFooterProps) {
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
