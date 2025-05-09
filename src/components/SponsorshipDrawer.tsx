// src/components/SponsorshipDrawer.tsx (경로는 예시입니다)
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Gift } from 'lucide-react';
import {
  DrawerClose,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'; // shadcn/ui Drawer 경로
import { Label } from '@radix-ui/react-label';

interface SponsorshipDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maxSupportAmount: number;
  // currentTotalSupport: number; // 필요하다면 현재까지 모인 총 후원금액을 표시하기 위해 사용
  onConfirmSupport: (newSupportAmount: number) => void;
}

const SponsorshipDrawer: React.FC<SponsorshipDrawerProps> = ({
  open,
  onOpenChange,
  maxSupportAmount,
  onConfirmSupport,
}) => {
  const [currentSliderValue, setCurrentSliderValue] = useState<number[]>([0]);
  const [currentInputValue, setCurrentInputValue] = useState<string>('0');

  useEffect(() => {
    // Drawer가 열릴 때 값을 초기화
    if (open) {
      setCurrentSliderValue([0]);
      setCurrentInputValue('0');
    }
  }, [open]);

  const handleSliderChange = (newValues: number[]) => {
    // 슬라이더 값은 항상 min/max 범위 내로 제한됨
    const constrainedValue = Math.max(
      0,
      Math.min(newValues[0], maxSupportAmount),
    );
    setCurrentSliderValue([constrainedValue]);
    setCurrentInputValue(constrainedValue.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = e.target.value;
    setCurrentInputValue(textValue); // 사용자가 입력하는 대로 표시

    if (textValue === '') {
      setCurrentSliderValue([0]); // 입력값이 비면 슬라이더를 0으로
      return;
    }

    const numValue = parseInt(textValue, 10);
    // 유효한 숫자이고 범위 내에 있다면 슬라이더도 동기화
    if (!isNaN(numValue) && numValue >= 0 && numValue <= maxSupportAmount) {
      setCurrentSliderValue([numValue]);
    }
    // 범위 밖의 숫자는 onBlur나 Enter 시에 조정됨
  };

  const commitAndValidateInput = () => {
    let numValue = parseInt(currentInputValue, 10);

    if (isNaN(numValue) || numValue < 0) {
      numValue = 0;
    } else if (numValue > maxSupportAmount) {
      numValue = maxSupportAmount;
    }

    setCurrentSliderValue([numValue]);
    setCurrentInputValue(numValue.toString());
  };

  const handleConfirm = () => {
    // 최종적으로 커밋된 슬라이더 값을 사용
    const amountToConfirm = currentSliderValue[0];
    onConfirmSupport(amountToConfirm);
    onOpenChange(false); // 확인 후 Drawer 닫기
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="fixed right-0 bottom-0 left-0 mt-2 flex flex-col rounded-t-[10px] bg-white p-4">
        <DrawerTitle className="mb-1 text-xl font-semibold text-slate-800">
          프로젝트 후원하기
        </DrawerTitle>
        <p className="mb-6 text-sm text-slate-500">
          후원할 금액을 선택해주세요. 최대 {maxSupportAmount.toLocaleString()}
          원까지 후원할 수 있습니다.
        </p>

        {/* === 제공해주신 코드 스니펫 부분 (수정 적용) === */}
        <div className="mb-6 flex items-center gap-4">
          <Slider
            className="grow bg-gray-200"
            value={currentSliderValue}
            onValueChange={handleSliderChange}
            min={0}
            max={maxSupportAmount}
            step={1000} // 예시: 1000원 단위로 조절
            aria-label="후원 금액 선택 슬라이더"
          />
          <Input
            className="h-10 w-24 rounded-md border border-slate-300 px-3 py-2 text-right text-sm"
            type="text"
            inputMode="numeric" // 숫자 키패드 우선 표시
            value={currentInputValue}
            onChange={handleInputChange}
            onBlur={commitAndValidateInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                commitAndValidateInput();
              }
            }}
            aria-label="후원 금액 입력"
          />
        </div>

        <div className="mb-4 text-center">
          <p className="text-sm text-slate-600">선택한 후원금액</p>
          <p className="text-2xl font-bold text-amber-600">
            {currentSliderValue[0].toLocaleString()}원
          </p>
        </div>

        <DrawerFooter className="pt-4">
          <Button
            onClick={handleConfirm}
            className="w-full bg-amber-500 py-3 text-base font-semibold text-white hover:bg-amber-600"
            disabled={currentSliderValue[0] === 0 && currentInputValue === '0'} // 0원일 때 비활성화 (선택사항)
          >
            <Gift />
            {currentSliderValue[0].toLocaleString()}원 후원하기
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="mt-2 w-full py-3 text-base text-slate-600 hover:bg-slate-100"
          >
            취소
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SponsorshipDrawer;
