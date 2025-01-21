import React from 'react';
import Image from 'next/image';
const BackgroundOverlay = () => {
  return (
    <div className="background-container">
      <div className="background-overlay" />
      <Image
        src="/bgcompute.png"
        alt="Background"
        width={100}
        height={'0'}
        className="background-image"
      />
      <div className="text-overlay">
        <h1 className="h1-custom-bold">Clinical Case Generator</h1>
        <p className="text-[18px] font-regular paragraph-large-regular">
          Generate realistic clinical cases based on real medical data.
          Customise symptoms, diagnosis and treatment to simulate real-life
          scenarios, perfect for everyone.
        </p>
      </div>
    </div>
  );
};

export default BackgroundOverlay;
