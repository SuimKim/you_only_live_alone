import Image from 'next/image';
import HeaderDropdownMenu from '@/components/layout/header/header-dropdown-menu';
import type { MenuItem } from '@/types/components/header';
import { PATH } from '@/constants/page-path';
import MENU_ICON from '@images/images/challenge_menu.svg';

const NavChallengeMenu = () => {
  const challengeMenuItem: MenuItem[] = [
    { href: PATH.MEAL_CHECKLIST, label: '혼밥' },
    { href: PATH.TRAVEL_CHECKLIST, label: '혼자여행' },
    { href: PATH.GOD_LIFE_CHECKLIST, label: '갓생' },
    { href: PATH.CLEAN_CHECKLIST, label: '청소' },
    { href: PATH.PLAY_CHECKLIST, label: '혼놀', isLine: false }
  ];
  return (
    <div data-state="Dropdown" className="inline-flex h-11 items-center justify-center gap-2.5 py-2.5">
      <HeaderDropdownMenu menuItems={challengeMenuItem}>
        <div className="flex h-[25px] w-[72px] justify-between text-center">
          챌린지
          <Image
            src={MENU_ICON}
            alt="챌린지 메뉴 드롭 다운 표시"
            width={14}
            height={26}
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </HeaderDropdownMenu>
    </div>
  );
};

export default NavChallengeMenu;
