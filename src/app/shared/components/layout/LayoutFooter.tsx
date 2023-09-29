'use client';
import { Divider } from '@nextui-org/react';
import { ViewModel } from '@domain/uiStates';
import { NAV_BAR_MENU_ITEM_LIST } from '@shared/constants';
import { LayoutIconList } from './LayoutIconList';
import { LayoutMenuLink } from './LayoutMenuLink';

interface LayoutFooterProps {
  view: ViewModel;
}

export function LayoutFooter({ view }: LayoutFooterProps) {
  return (
    <footer className="w-full p-6 flex flex-col items-center justify-center gap-2 ">
      <Divider />

      <ul className="flex gap-4 my-6">
        {NAV_BAR_MENU_ITEM_LIST.map(({ href, isExternal, label }) => (
          <li key={href}>
            <LayoutMenuLink
              href={href}
              className="text-md"
              isExternal={isExternal}
              label={label}
              isActive={false}
            />
          </li>
        ))}
      </ul>

      <LayoutIconList />

      <div className="text-sm mt-6">&copy; kimchanghoe 2023</div>
      <div className="text-xs">
        {view.today} / {view.total}
      </div>
    </footer>
  );
}
