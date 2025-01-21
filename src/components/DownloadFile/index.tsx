/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';

interface ComponentProps {
  ontologyData: any;
  xmlData: any;
  csvData: any;
}
const DownloadFile = ({ ontologyData, xmlData, csvData }: ComponentProps) => {
  const FileTypeData = [
    {
      source: './csv.svg',
      extension: '.csv',
      alt: 'csv icon',
      width: 32,
      height: 44,
      data: csvData,
      type: 'csv',
    },
    {
      source: './xml.svg',
      extension: '.xml',
      alt: 'xml icon',
      width: 48,
      height: 60,
      data: xmlData,
      type: 'xml',
    },
    {
      source: '/owl.png',
      extension: '.owl',
      alt: 'owl icon',
      width: 44,
      height: 60,
      data: ontologyData,
      type: 'xml',
    },
  ];

  const downloadFile = (data: string, filename: string, docType: string) => {
    let type = '';
    if (docType === 'csv') {
      type = 'text/csv';
    } else if (docType === 'xml') {
      type = 'application/xml';
    } else if (docType === 'owl') {
      type = 'application/rdf+xml';
    }

    // Create a Blob object with the data content
    const blob = new Blob([data], { type: type });

    // Get the size of the file in bytes
    const fileSize = blob.size;
    console.log(`File size: ${fileSize} bytes`);

    // Create a link to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename; // Specify the file name for download

    // Programmatically click the link to start the download
    link.click();
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="h6-custom-bold font-semibold text-customBlack-500">
        Résultats
      </p>

      <div className="w-[500px] flex flex-col gap-4">
        {FileTypeData.map((type, index) => {
          const fileSize = new Blob([type.data]).size;
          const formattedFileSize = (fileSize / 1024).toFixed(2);
          return (
            <div
              key={index}
              className="w-full border border-input flex justify-between items-center rounded-md px-3 py-2"
            >
              <div className="flex gap-2">
                <div className='w-[44px]'>
                  {' '}
                  <Image
                    src={type.source}
                    alt={type.alt}
                    width={type.width}
                    height={type.height}
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="paragraph-medium-medium text-customBlack-500">
                    Cas1{type.extension}
                  </p>
                  <p className="paragraph-medium-regular text-[15px] text-customBlack-300">
                    {formattedFileSize}Ko
                  </p>
                </div>
              </div>
              <button
                onClick={() => downloadFile(type.data, 'Cas1', type.type)}
                className="rounded-md flex items-center gap-2 px-6 py-[6px] bg-[rgb(156,156,156)] hover:bg-[rgb(147,147,147)]  transition"
              >
                <Download size={20} color="#fff" />
                <span className="text-white text-[15px] paragraph-medium-medium">
                  Download
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DownloadFile;
