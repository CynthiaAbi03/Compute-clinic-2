/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ComboBoxProps {
  dropdownValue: string;
  setDropdownValue: React.Dispatch<React.SetStateAction<string>>;
  dropdownData: string[];
  type: string;
}

export function ComboboxDemo({
  dropdownData,
  dropdownValue,
  setDropdownValue,
  type,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {dropdownValue ? (
            <span className="text-customBlack-500 paragraph-medium-regular text-[15px]">
              {dropdownData.find((data) => data === dropdownValue)}
            </span>
          ) : (
            <span className="paragraph-medium-medium font-normal text-[15px] text-customBlack-300">
              Select...
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>{`No ${type} found`}</CommandEmpty>
            <CommandGroup>
              {dropdownData.map((data, index) => (
                <CommandItem
                  key={index}
                  value={data}
                  onSelect={(currentValue) => {
                    setDropdownValue(
                      currentValue === dropdownValue ? '' : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      dropdownValue === data ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {data}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
