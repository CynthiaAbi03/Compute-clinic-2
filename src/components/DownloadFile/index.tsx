import React from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';

const DownloadFile = () => {
  const FileTypeData = [
    {
      source: './csv.svg',
      extension: '.csv',
      alt: 'csv icon',
    },
    {
      source: './pdf.svg',
      extension: '.pdf',
      alt: 'pdf icon',
    },
    {
      source: './json.svg',
      extension: '.json',
      alt: 'json icon',
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <p className="h6-custom-bold font-semibold text-customBlack-500">
        Résultats
      </p>

      <div className="w-[500px] flex flex-col gap-4">
        {FileTypeData.map((type, index) => (
          <div
            key={index}
            className="w-full border border-input flex justify-between items-center rounded-md px-3 py-2"
          >
            <div className="flex gap-2">
              <Image src={type.source} alt={type.alt} width={32} height={44} />
              <div className="flex flex-col ">
                <p className="paragraph-medium-medium text-customBlack-500">
                  Cas{type.extension}
                </p>
                <p className="paragraph-medium-regular text-[15px] text-customBlack-300">
                  19mo
                </p>
              </div>
            </div>
            <button className="rounded-md flex items-center gap-2 px-6 py-[6px] bg-[rgb(156,156,156)] hover:bg-[rgb(147,147,147)]  transition">
              <Download size={20} color="#fff" />
              <span className="text-white text-[15px] paragraph-medium-medium">
                Télécharger
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadFile;
