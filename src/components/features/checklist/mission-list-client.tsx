'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/hooks/use-toast';
import { PATH } from '@/constants/page-path';
import { MSG } from '@/constants/messages';
import type { MissionType } from '@/types/checklist';
import DONE from '@images/images/checklist-done.svg';
import UNDO from '@images/images/checklist-undo.svg';
import Image from 'next/image';

type MissionWithStatus = MissionType & { completed: boolean };
interface ClientMissionListProps {
  missionList: MissionWithStatus[];
  userId?: string;
}

const MissionListClient = ({ missionList, userId }: ClientMissionListProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleMissionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!userId) {
      e.preventDefault();

      toast({
        title: MSG.NEED_LOGIN,
        description: MSG.LOGIN_BEFORE_POST_MISSION_CLEAR,
        variant: 'destructive'
      });
      router.push(PATH.LOGIN);
    }
  };

  const handleCompletedMissionClick = () => {
    toast({
      title: MSG.ALREADY_CLEAR,
      description: MSG.ALREADY_CLEAR_CHOOSE_OTHER,
      variant: 'default'
    });
  };

  return (
    <ul className="mt-[129px] flex w-full max-w-[1200px] items-center gap-[24px]">
      {missionList.map((mission) => {
        const isCompleted = mission.completed;

        const href = isCompleted
          ? '#' // TODO: 완료된 미션 보러가기
          : userId
            ? `${PATH.LIFE_POST}?mission_id=${mission.id}` // 진행 전 + 로그인 O → 인증 페이지 이동
            : '#'; // 진행 전 + 로그인 X → 이동 X

        const baseClasses = `h-[248px] w-[221px] rounded-[20px] border border-[var(--gray-secondary-300, #D3D8DD)] bg-white flex flex-col items-start`;

        const handleClick = isCompleted ? handleCompletedMissionClick : !userId ? handleMissionClick : undefined;

        return (
          <li key={mission.id} className="">
            <Link href={href} onClick={handleClick} className={baseClasses}>
              <strong className="flex w-[221px] items-start gap-[10px] px-[20px] py-[20px] pb-0 pt-[20px]">
                <span className="flex-1 grow basis-0 text-[16px] font-semibold leading-[1.4] text-[#652104]">
                  {mission.content}
                </span>
              </strong>
              <figure className="flex flex-1 items-center justify-center gap-[10px] self-stretch px-[10px]">
                <Image
                  src={isCompleted ? DONE : UNDO}
                  alt={isCompleted ? '완료' : '진행 전'}
                  className="h-[93px] w-[93px] flex-shrink-0"
                />
              </figure>
              <div className="flex h-[45px] items-center justify-center gap-[10px] self-stretch rounded-b-[20px] bg-[#FEDF89]">
                <span className="flex-1 grow basis-0 text-center text-[14px] leading-[1.4]">
                  {isCompleted ? '인증글 보기' : '인증하기'}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MissionListClient;
