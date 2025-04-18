import Link from 'next/link';
import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';

const GuestOptionMenu = () => {
  return (
    <CustomButton asChild variant="default" size="login">
      <Link href={PATH.LOGIN}>로그인</Link>
    </CustomButton>
  );
};

export default GuestOptionMenu;
