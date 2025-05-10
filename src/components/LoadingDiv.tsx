import useAnalizeQuery from '@/hooks/useAnalizeQuery';
import React, { Suspense } from 'react';

type LoadingDivProps = {
  userId: number;
};

const LoadingDiv = ({ userId }: LoadingDivProps) => {
  const { data: analizeData } = useAnalizeQuery(userId);

  return (
    <div className="height-fit flex w-full flex-col items-center justify-center p-4">
      <p className="text-base text-gray-800">{analizeData.summary}</p>
    </div>
  );
};

export default LoadingDiv;
