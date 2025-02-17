import React from 'react';
import Image from 'next/image';

export const LoaderGif: React.FC = () => {
  return (
    <div className="loaderContainer">
      <Image
        src="/images/loader2.gif"
        alt="Loading..."
        width={100}
        height={100}
        priority
      />
    </div>
  );
};

export const LoaderSpinner: React.FC = () => {
  return (
    <div className="loaderContainer2">
      <Image
        src="/images/loader2.gif"
        alt="Loading..."
        width={100}
        height={100}
        priority
      />
    </div>
  );
};

export const LoaderMiddle: React.FC = () => {
  return (
    <div className="loaderContainer3">
      <Image
        src="/images/loader2.gif"
        alt="Loading..."
        width={100}
        height={100}
        priority
      />
    </div>
  );
};

// Add this default export
export default LoaderGif;
