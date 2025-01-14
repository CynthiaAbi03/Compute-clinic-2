/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import BackgroundOverlay from '@/components/BackgroundOverlay';
import RegisterClinicCard from '@/components/RegisterClinicCard';
import GenerateClinicalCase from '@/components/GenerateClinicalCase';
import Image from 'next/image';
import DownloadFile from '@/components/DownloadFile';
import { useState } from 'react';

export default function Home() {
  const [resultGenerated, setResultGenerated] = useState<boolean>(false);
  return (
    <div>
      <BackgroundOverlay />
      <div className="mt-9 flex w-full justify-center gap-40">
        <GenerateClinicalCase
          resultGenerated={resultGenerated}
          setResultGenerated={setResultGenerated}
        />
        {resultGenerated && <DownloadFile />}
      </div>
    </div>
  );
}
