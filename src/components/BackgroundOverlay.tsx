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
        <h1 className="h1-custom-bold">Générateur de Cas Cliniques</h1>
        <p className="text-[18px] font-regular paragraph-large-regular">
          Générez des cas cliniques réalistes basés sur des données médicales
          réelles. Personnalisez les symptômes, le diagnostic et le traitement
          pour simuler des scénarios réels, parfait pour tous.
        </p>
      </div>
    </div>
  );
};

export default BackgroundOverlay;
