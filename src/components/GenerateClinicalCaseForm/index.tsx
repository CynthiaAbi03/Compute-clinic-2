/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useEffect, useState } from 'react';
import { ComboboxDemo } from '../ui/ComboBox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import DotLoader from 'react-spinners/DotLoader';
import { CircleLoader } from 'react-spinners';
import Spinner from '../ui/Spinner';
import { API_ROUTE } from '@/constants/api';

interface FormData {
  minAge: string;
  maxAge: string;
  minWeight: string;
  maxWeight: string;
  minHeight: string;
  maxHeight: string;
  minTemperature: string;
  maxTemperature: string;
}
interface Error {
  [key: string]: string;
}
interface ComponentProps {
  resultGenerated: boolean;
  formData: FormData;
  setResultGenerated: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedSymptom: string;
  setSelectedSymptom: React.Dispatch<React.SetStateAction<string>>;
  selectedMedicalHistory: string;
  setSelectedMedicalHistory: React.Dispatch<React.SetStateAction<string>>;
  selectedSex: string;
  setSelectedSex: React.Dispatch<React.SetStateAction<string>>;
  error: Error;
  setError: React.Dispatch<React.SetStateAction<Error>>;
}
const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};
const GenerateClinicalCaseForm = ({
  resultGenerated,
  setResultGenerated,
  formData,
  setFormData,
  isLoading,
  setIsLoading,
  handleSubmit,
  selectedSymptom,
  setSelectedSymptom,
  selectedMedicalHistory,
  setSelectedMedicalHistory,
  selectedSex,
  setSelectedSex,
  error,
  setError,
}: ComponentProps) => {
  const [symptomes, setSymptomes] = useState([]);
  const [famiyHistory, setFamilyHistory] = useState([]);

  const handleOnChange = (name: string, value: string | number) => {
    let newValue: number | string = value;

    if (typeof value === 'string') {
      newValue = value;
    } else if (typeof value === 'number') {
      newValue = value < 0 ? '' : value;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const getAllSymptomes = async () => {
    try {
      const res = await fetch(`${API_ROUTE}/api/v1/data/symptomes/all`, {
        method: 'GET',
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setSymptomes(data);
    } catch (error) {
      console.error('Failed to fetch symptomes', error);
      throw error;
    }
  };

  const getAllAntecedents = async () => {
    try {
      const res = await fetch(`${API_ROUTE}/api/v1/data/antecedents/all`, {
        method: 'GET',
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setFamilyHistory(data);
    } catch (error) {
      console.error('Failed to fetch antecedents', error);
      throw error;
    }
  };

  const getAllSex = async () => {
    try {
      const res = await fetch(`${API_ROUTE}/api/v1/data/sex/all`, {
        method: 'GET',
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      //console.log(data);
    } catch (error) {
      console.error('Failed to fetch sex', error);
      throw error;
    }
  };


  useEffect(() => {
    getAllSymptomes();
    getAllAntecedents();
    //getAllSex();
  }, []);

  return (
    <div className="w-[580px]  flex flex-col gap-6  pt-5 border border-input rounded-md">
      <div className="flex px-6 flex-col">
        <p className="paragraph-large-bold text-[20px] font-semibold text-customBlack-500">
          Clinical case Generator
        </p>
        <p className="paragraph-medium-regular text-[16px] text-customBlack-300">
          Apply one or more filters to personalise your clinical cases.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="h-[550px] overflow-y-auto">
          <div className="flex flex-col gap-6 px-6">
            {/* searched diagnostic */}
            {/* <div className="flex flex-col gap-2">
              <label className="main-label">Diagnostic recherché</label>
              <ComboboxDemo
                dropdownData={diagnostics}
                dropdownValue={selectedDiagnositic}
                type="diagnostic"
                setDropdownValue={setSelectedDiagnostics}
              />
            </div> */}

            {/* searched symptoms */}
            <div className="flex flex-col gap-2">
              <label className="main-label">Symptom</label>
              <ComboboxDemo
                dropdownData={symptomes && symptomes}
                dropdownValue={selectedSymptom}
                type="symptom"
                setDropdownValue={setSelectedSymptom}
              />
            </div>

            {/* searched medical history */}
            <div className="flex flex-col gap-2">
              <label className="main-label">Previous medical history</label>
              <ComboboxDemo
                dropdownData={famiyHistory}
                dropdownValue={selectedMedicalHistory}
                type="family history"
                setDropdownValue={setSelectedMedicalHistory}
              />
            </div>

            {/* select sex */}
            <div className="flex flex-col gap-2">
              <label className="main-label">Sex</label>
              <RadioGroup
                className="flex items-center gap-6"
                defaultValue="all"
                onValueChange={(value) => setSelectedSex(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="option-one" />
                  <label className="sub-label" htmlFor="option-one">
                    All
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="M" id="option-two" />
                  <label className="sub-label" htmlFor="option-two">
                    Masculin
                  </label>
                </div>
                <div className="flex items-center text-[15px] space-x-2">
                  <RadioGroupItem value="F" id="option-two" />
                  <label className="sub-label" htmlFor="option-two">
                    Feminin
                  </label>
                </div>
              </RadioGroup>
            </div>

            {/* select age */}
            <div className="flex flex-col gap-2">
              <label className="main-label">Age range</label>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <label className="sub-label" htmlFor="minAge">
                    Min:
                  </label>
                  <input
                    placeholder="0"
                    className="custom-input"
                    type="number"
                    value={formData && formData.minAge}
                    onChange={(e) =>
                      handleOnChange(e.target.name, Number(e.target.value))
                    }
                    min={0}
                    id="minAge"
                    name="minAge"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="sub-label" htmlFor="maxAge">
                    Max:
                  </label>
                  <input
                    placeholder="0"
                    className="custom-input"
                    onChange={(e) =>
                      handleOnChange(e.target.name, Number(e.target.value))
                    }
                    type="number"
                    value={formData && formData.maxAge}
                    min={0}
                    id="maxAge"
                    name="maxAge"
                  />
                </div>
              </div>
              {error && error.age && (
                <p
                  style={{ color: 'red' }}
                  className="text-[14.8px] paragraph-medium-regular "
                >
                  {error.age}
                </p>
              )}
              {/* <RadioGroup
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
          </RadioGroup> */}
            </div>

            {/* select weight */}
            <div className="flex flex-col gap-2">
              <label className="main-label">Weight range (kg)</label>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <label className="sub-label" htmlFor="minWeight">
                    Min:
                  </label>
                  <input
                    placeholder="0"
                    onChange={(e) =>
                      handleOnChange(e.target.name, Number(e.target.value))
                    }
                    value={formData && formData.minWeight}
                    className="custom-input"
                    type="number"
                    step={0.01}
                    min={0}
                    id="minWeight"
                    name="minWeight"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="sub-label" htmlFor="maxWeight">
                    Max:
                  </label>
                  <input
                    placeholder="0"
                    onChange={(e) =>
                      handleOnChange(e.target.name, Number(e.target.value))
                    }
                    value={formData && formData.maxWeight}
                    className="custom-input"
                    type="number"
                    step={0.01}
                    min={0}
                    id="maxWeight"
                    name="maxWeight"
                  />
                </div>
              </div>
              {error && error.weight && (
                <p
                  style={{ color: 'red' }}
                  className="text-[14.8px] paragraph-medium-regular "
                >
                  {error.weight}
                </p>
              )}
            </div>

            {/* select height */}
            <div className="flex flex-col gap-2">
              <label className="main-label">Height range (m)</label>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <label className="sub-label" htmlFor="minHeight">
                    Min:
                  </label>
                  <input
                    step={0.01}
                    placeholder="0"
                    className="custom-input"
                    value={formData && formData.minHeight}
                    type="number"
                    min={0}
                    onChange={(e) =>
                      handleOnChange(e.target.name, Number(e.target.value))
                    }
                    id="minHeight"
                    name="minHeight"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="sub-label" htmlFor="maxHeight">
                    Max:
                  </label>
                  <input
                    step={0.01}
                    placeholder="0"
                    className="custom-input"
                    value={formData && formData.maxHeight}
                    type="number"
                    onChange={(e) =>
                      handleOnChange(e.target.name, Number(e.target.value))
                    }
                    min={0}
                    id="maxHeight"
                    name="maxHeight"
                  />
                </div>
              </div>
              {error && error.height && (
                <p
                  style={{ color: 'red' }}
                  className="text-[14.8px] paragraph-medium-regular "
                >
                  {error.height}
                </p>
              )}
            </div>

            {/* select temperature */}
            <div className="flex flex-col gap-2">
              <label className="main-label">Temperature range (°C)</label>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <label className="sub-label" htmlFor="minTemperature">
                    Min:
                  </label>
                  <input
                    step={0.01}
                    placeholder="0"
                    className="custom-input"
                    type="number"
                    onChange={(e) =>
                      handleOnChange(e.target.name, Number(e.target.value))
                    }
                    value={formData && formData.minTemperature}
                    min={0}
                    id="minTemperature"
                    name="minTemperature"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="sub-label" htmlFor="maxTemperature">
                    Max:
                  </label>
                  <input
                    step={0.01}
                    className="custom-input"
                    placeholder="0"
                    value={formData && formData.maxTemperature}
                    type="number"
                    onChange={(e) =>
                      handleOnChange(e.target.name, Number(e.target.value))
                    }
                    min={0}
                    id="maxTemperature"
                    name="maxTemperature"
                  />
                </div>
              </div>
              {error && error.temperature && (
                <p
                  style={{ color: 'red' }}
                  className="text-[14.8px] paragraph-medium-regular "
                >
                  {error.temperature}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-t-[hsl(0,0%,75%)] px-6">
          <button
            type="submit"
            className="flex items-center justify-center gap-3 my-5 text-white py-2 w-full bg-customBlue-500 hover:bg-[rgb(0,78,158)] transition rounded-md border-none outline-none paragraph-medium-medium"
          >
            {isLoading && <Spinner />}
            <p className="w-fit">Generate clinical case</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateClinicalCaseForm;
