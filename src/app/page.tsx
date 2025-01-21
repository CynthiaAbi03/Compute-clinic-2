/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import BackgroundOverlay from '@/components/BackgroundOverlay';

import Image from 'next/image';
import DownloadFile from '@/components/DownloadFile';
import { useState } from 'react';
import GenerateClinicalCaseForm from '@/components/GenerateClinicalCaseForm';
import { API_ROUTE } from '@/constants/api';

interface DataToSendInterface {
  [key: string]: string | number;
}

export default function Home() {
  const [resultGenerated, setResultGenerated] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    minAge: '',
    maxAge: '',
    minWeight: '',
    maxWeight: '',
    minHeight: '',
    maxHeight: '',
    minTemperature: '',
    maxTemperature: '',
  });
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');
  const [selectedMedicalHistory, setSelectedMedicalHistory] =
    useState<string>('');
  const [selectedSex, setSelectedSex] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState({});
  const [csvData, setCsvData] = useState('');
  const [xmlData, setXmlData] = useState('');
  const [ontologyData, setOntologyData] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //error handling
    const errors: { [key: string]: string } = {};

    if (formData?.minAge > formData?.maxAge) {
      errors.age = 'Max age must be greater than min age';
    }

    if (formData?.minWeight > formData?.maxWeight) {
      errors.weight = 'Max weight must be greater than min weight';
    }

    if (formData?.minTemperature > formData?.maxTemperature) {
      errors.temperature =
        'Max temperature must be greater than min temperature';
    }

    if (formData?.minHeight > formData?.maxHeight) {
      errors.height = 'Max height must be greater than min height';
    }

    if (Object.keys(errors).length > 0) {
      setError(errors); // Set the accumulated errors
    } else {
      setError({}); // Clear errors if no issues
    }

    const dataToSend: DataToSendInterface = {
      sex: selectedSex && selectedSex,
      minAge: formData?.minAge,
      maxAge: formData?.maxAge,
      minWeight: formData?.minWeight,
      maxWeight: formData?.maxWeight,
      minHeight: formData?.minHeight,
      maxHeight: formData?.maxHeight,
      minTemperature: formData?.minTemperature,
      maxTemperature: formData?.maxTemperature,
      symptomes: selectedSymptom && selectedSymptom,
      antecedents: selectedMedicalHistory && selectedMedicalHistory,
    };

    Object.keys(dataToSend).forEach((key) => {
      if (dataToSend[key] === '' || dataToSend[key] === 'all') {
        delete dataToSend[key];
      }
    });

    try {
      setIsLoading(true);
      // Fetch the ontology data
      const ontologyRes = await fetch(
        `${API_ROUTE}/api/v1/file/ontology/filtered`,
        {
          method: 'GET',
        }
      );
      if (!ontologyRes.ok) {
        throw new Error(
          `Error: ${ontologyRes.status} ${ontologyRes.statusText}`
        );
      }
      const ontologyData = await ontologyRes.text(); 
      setOntologyData(ontologyData); 

      // Fetch the CSV data
      const csvRes = await fetch(`${API_ROUTE}/api/v1/file/csv/filtered`, {
        method: 'GET',
      });
      if (!csvRes.ok) {
        throw new Error(`Error: ${csvRes.status} ${csvRes.statusText}`);
      }
      const csvData = await csvRes.text();
      setCsvData(csvData); 

      // Fetch the XML data
      const xmlRes = await fetch(`${API_ROUTE}/api/v1/file/xml/filtered`, {
        method: 'GET',
      });
      if (!xmlRes.ok) {
        throw new Error(`Error: ${xmlRes.status} ${xmlRes.statusText}`);
      }
      const xmlData = await xmlRes.text(); 
      setXmlData(xmlData); 

      // Mark the result as generated after all fetches
      setResultGenerated(true);
    } catch (err) {
      console.error('Failed to fetch', err);
      
    } finally {
      setIsLoading(false)
    }

  };

  return (
    <div>
      <BackgroundOverlay />
      <div className="mt-9 flex w-full justify-center gap-40">
        <GenerateClinicalCaseForm
          resultGenerated={resultGenerated}
          setResultGenerated={setResultGenerated}
          formData={formData}
          setFormData={setFormData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          handleSubmit={handleSubmit}
          selectedSymptom={selectedSymptom}
          setSelectedSymptom={setSelectedSymptom}
          selectedMedicalHistory={selectedMedicalHistory}
          setSelectedMedicalHistory={setSelectedMedicalHistory}
          selectedSex={selectedSex}
          setSelectedSex={setSelectedSex}
          error={error}
          setError={setError}
        />
        {resultGenerated && !isLoading && (
          <DownloadFile
            ontologyData={ontologyData}
            xmlData={xmlData}
            csvData={csvData}
          />
        )}
      </div>
    </div>
  );
}
