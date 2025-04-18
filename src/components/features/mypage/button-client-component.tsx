'use client';

import Image from 'next/image';
import { useState } from 'react';
import RandomMissionModal from '@/components/features/modals/random-mission';
import CHEVRON_RIGHT from '@images/images/chevron-right.svg';
import type { Tables } from '@/types/supabase';

interface ButtonClientComponentProps {
  missionsData: Tables<'mission_list'>[];
  isLogin: boolean;
}

const ButtonClientComponent = ({ missionsData, isLogin }: ButtonClientComponentProps) => {
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

  return (
    <div>
      <button
        onClick={clickModal}
        className="flex items-center justify-start text-base font-normal leading-snug text-secondary-grey-900"
      >
        미션 받으러 가기
        <Image src={CHEVRON_RIGHT} alt="미션 받으러 가기 화살표 아이콘" height={24} width={24} />
      </button>
      {showModal && (
        <RandomMissionModal
          missionsData={missionsData}
          clickModal={clickModal}
          showModal={showModal}
          isLogin={isLogin}
        />
      )}
    </div>
  );
};

export default ButtonClientComponent;
