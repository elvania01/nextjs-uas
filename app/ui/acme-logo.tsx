'use client';

import { pacifico } from '@/app/ui/fonts';
import Image from 'next/image';
import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function AcmeLogo(props: Props) {
  return (
    <div {...props} className={`flex items-center space-x-3 ${props.className}`}>
      <Image src="/noona-logo.png" alt="Noona Florist" width={40} height={40} />
      <h1 className={`${pacifico.className} text-2xl text-white-600`}>
        Noona Florist
      </h1>
    </div>
  );
}
