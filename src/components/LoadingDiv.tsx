import React from 'react';

type LoadingDivProps = {
  loading: boolean;
  result: string;
};

const LoadingDiv = ({ loading, result }: LoadingDivProps) => {
  return (
    <div className="height-fit flex w-full flex-col items-center justify-center p-4">
      {loading ? (
        <>
          {/* 스피너 */}
          <div className="mb-2 flex h-8 w-8 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
          </div>
          {/* 로딩 문구 */}
          <p className="text-sm text-gray-600">AI가 사용자를 분석중입니다...</p>
        </>
      ) : (
        /* 분석 완료 후 결과 */
        <p className="text-base text-gray-800">{result}</p>
      )}
    </div>
  );
};

export default LoadingDiv;
