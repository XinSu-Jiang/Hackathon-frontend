import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { DrawerContent } from '@/components/ui/drawer';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect, useState } from 'react';

type FilterDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isMultiple: boolean;
  setValue: (value: string[] | string) => void;
  initialValue: string[] | string;
  availableValues: string[];
  header: string;
  description: string;
};

const FilterDrawer = ({
  open,
  onOpenChange,
  isMultiple,
  setValue,
  header,
  description,
  initialValue,
  availableValues,
}: FilterDrawerProps) => {
  const [internalSelection, setInternalSelection] = useState<string[] | string>(
    initialValue,
  );

  useEffect(() => {
    if (open) {
      setInternalSelection(initialValue);
    }
  }, [open, initialValue]);

  const handleCheckboxChange = (value: string) => {
    setInternalSelection((prevSelection) => {
      const currentSelection = Array.isArray(prevSelection)
        ? prevSelection
        : [];
      if (currentSelection.includes(value)) {
        return currentSelection.filter((item) => item !== value);
      } else {
        return [...currentSelection, value];
      }
    });
  };

  const handleRadioChange = (value: string) => {
    setInternalSelection(value);
  };

  const handleReset = () => {
    setInternalSelection(isMultiple ? [] : '');
  };

  const handleApply = () => {
    setValue(internalSelection);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="flex w-full flex-col bg-white">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl font-semibold">{header}</DrawerTitle>
          {description && (
            <DrawerDescription className="text-md text-gray-500">
              {description}
            </DrawerDescription>
          )}
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">
          {isMultiple ? (
            <div className="space-y-3">
              {availableValues.map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`checkbox-${value}`}
                    checked={(internalSelection as string[]).includes(value)}
                    onCheckedChange={() => handleCheckboxChange(value)}
                    className="data-[state=checked]:bg-dark-light data-[state=checked]:border-dark-light h-5 w-5 rounded border-gray-300 data-[state=checked]:text-white" // 스타일 조정
                  />
                  <Label
                    htmlFor={`checkbox-${value}`}
                    className="cursor-pointer text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" // Label 스타일 추가
                  >
                    {value}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <RadioGroup
              value={internalSelection as string}
              onValueChange={handleRadioChange}
              className="space-y-3"
            >
              {availableValues.map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={value}
                    id={`radio-${value}`}
                    className="text-dark-light h-5 w-5 border-gray-300 focus:ring-amber-400" // 스타일 조정
                  />
                  <Label
                    htmlFor={`radio-${value}`}
                    className="cursor-pointer text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" // Label 스타일 추가
                  >
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        <DrawerFooter className="mt-auto flex-row gap-2 border-t border-gray-200 pt-4">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1 rounded-md border-gray-300"
          >
            초기화
          </Button>
          <DrawerClose asChild>
            <Button
              onClick={handleApply}
              className="flex-1 rounded-md bg-amber-400 text-white"
            >
              완료
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
