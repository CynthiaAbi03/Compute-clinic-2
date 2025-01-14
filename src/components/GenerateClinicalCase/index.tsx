/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import { ComboboxDemo } from '../ui/ComboBox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ComponentProps {
  resultGenerated: boolean;
  setResultGenerated: React.Dispatch<React.SetStateAction<boolean>>;
}
const GenerateClinicalCase = ({
  resultGenerated,
  setResultGenerated,
}: ComponentProps) => {
  const [selectedGroup, setSelectedGroup] = useState('option-one');
  const [selectedSex, setSelectedSex] = useState('option-one');
  const [selectedComplexity, setSelectedComplexity] = useState('option-one');
  const [selectedDiagnositic, setSelectedDiagnostics] = useState<string>('');
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');

  const diagnostics: string[] = [
    'Diabète de type 2',
    'Hypertension artérielle',
    'Asthme',
    'Infection urinaire',
    'Arthrite rhumatoïde',
    'Insuffisance cardiaque',
    'Migraine',
    'Anémie',
    'Bronchite chronique',
    'Gastrite',
  ];

  const symptomes = [
    'Fièvre',
    'Toux persistante',
    'Douleur abdominale',
    'Fatigue excessive',
    'Essoufflement',
    'Maux de tête',
    'Éruption cutanée',
    'Douleurs articulaires',
    'Perte de poids inexpliquée',
    'Nausées et vomissements',
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResultGenerated(true);
  };
  return (
    <div className="w-[500px] flex flex-col gap-6 px-6 py-5 border border-input rounded-md">
      <div className="flex flex-col">
        <p className="h6-custom-bold font-semibold text-customBlack-500">
          Générateur de Cas Clinique
        </p>
        <p className="paragraph-medium-regular text-[15px] text-customBlack-300">
          Appliquez un ou plusieurs filtres pour personnaliser vos cas
          cliniques.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* searched diagnostic */}
        <div className="flex flex-col gap-2">
          <label className="paragraph-medium-medium text-customBlack-500">
            Diagnostic recherché
          </label>
          <ComboboxDemo
            dropdownData={diagnostics}
            dropdownValue={selectedDiagnositic}
            type="diagnostic"
            setDropdownValue={setSelectedDiagnostics}
          />
        </div>

        {/* select age */}
        <div className="flex flex-col gap-1">
          <label className="paragraph-medium-medium text-customBlack-500">
            Groupe d&apos;âge
          </label>
          <RadioGroup
            className="flex items-center gap-6"
            defaultValue="option-one"
            onValueChange={(value) => setSelectedGroup(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <label
                className="text-customBlack-500 text-[15px] paragraph-medium-regular"
                htmlFor="option-one"
              >
                Tous
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <label
                className="text-customBlack-500 text-[15px] paragraph-medium-regular"
                htmlFor="option-two"
              >
                Enfant
              </label>
            </div>
            <div className="flex items-center text-[15px] space-x-2">
              <RadioGroupItem value="option-three" id="option-two" />
              <label
                className="text-customBlack-500 paragraph-medium-regular"
                htmlFor="option-two"
              >
                Adulte
              </label>
            </div>
            <div className="flex items-center text-[15px] space-x-2">
              <RadioGroupItem value="option-four" id="option-two" />
              <label
                className="text-customBlack-500 paragraph-medium-regular"
                htmlFor="option-two"
              >
                Personne âgée
              </label>
            </div>
          </RadioGroup>
        </div>

        {/* searched symptoms */}
        <div className="flex flex-col gap-2">
          <label className="paragraph-medium-medium text-customBlack-500">
            Symptôme recherché
          </label>
          <ComboboxDemo
            dropdownData={symptomes}
            dropdownValue={selectedSymptom}
            type="symptôme"
            setDropdownValue={setSelectedSymptom}
          />
        </div>

        {/* select sex */}
        <div className="flex flex-col gap-1">
          <label className="paragraph-medium-medium text-customBlack-500">
            Sexe
          </label>
          <RadioGroup
            className="flex items-center gap-6"
            defaultValue="option-one"
            onValueChange={(value) => setSelectedSex(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <label
                className="text-customBlack-500 text-[15px] paragraph-medium-regular"
                htmlFor="option-one"
              >
                Tous
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <label
                className="text-customBlack-500 text-[15px] paragraph-medium-regular"
                htmlFor="option-two"
              >
                Masculin
              </label>
            </div>
            <div className="flex items-center text-[15px] space-x-2">
              <RadioGroupItem value="option-three" id="option-two" />
              <label
                className="text-customBlack-500 paragraph-medium-regular"
                htmlFor="option-two"
              >
                Féminin
              </label>
            </div>
          </RadioGroup>
        </div>

        {/* select complexity */}
        <div className="flex flex-col gap-1">
          <label className="paragraph-medium-medium text-customBlack-500">
            Type de cas
          </label>
          <RadioGroup
            className="flex items-center gap-6"
            defaultValue="option-one"
            onValueChange={(value) => setSelectedComplexity(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <label
                className="text-customBlack-500 text-[15px] paragraph-medium-regular"
                htmlFor="option-one"
              >
                Cas Simple
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <label
                className="text-customBlack-500 text-[15px] paragraph-medium-regular"
                htmlFor="option-two"
              >
                Cas complexe
              </label>
            </div>
          </RadioGroup>
        </div>

        <button
          type="submit"
          className="my-2 text-white py-2 w-full bg-customBlue-500 hover:bg-[rgb(0,78,158)] transition rounded-md border-none outline-none paragraph-medium-medium"
        >
          Générer cas clinique
        </button>
      </form>
    </div>
  );
};

export default GenerateClinicalCase;
