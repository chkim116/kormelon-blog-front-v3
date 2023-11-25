'use client';
import { Divider } from '@nextui-org/react';
import { ViewUiState } from '@domain/view/view.uiState';
import { NavbarIconList } from 'src/app/shared/components/NavbarIconList';
import { NavbarMenuLink } from 'src/app/shared/components/NavbarMenuLink';
import { NAV_BAR_MENU_ITEM_LIST } from 'src/app/shared/constants/navbar.const';

interface FooterContainerClientProps {
  view: ViewUiState;
}

export function FooterContainerClient({ view }: FooterContainerClientProps) {
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
