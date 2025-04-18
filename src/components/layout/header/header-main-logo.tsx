import { MAIN_LOGO_URL } from '@/constants/default-image-url';
import { PATH } from '@/constants/page-path';
import Image from 'next/image';
import Link from 'next/link';

const MainLogo = () => {
  return (
    <Link href={PATH.HOME}>
      <Image src={MAIN_LOGO_URL} alt="YOLA 로고" width={84} height={23} />
    </Link>
  );
};

export default MainLogo;
