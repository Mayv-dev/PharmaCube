import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Picture2 from '../Picture2.png';
import './SplashScreen.css';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500); 
    }, 2000); 

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <IonPage className={`splash-screen ${isVisible ? 'visible' : 'hidden'}`}>
      <IonContent className="ion-padding">
        <div className="splash-container">
          <img 
            src={Picture2} 
            alt="PharmaCube Logo" 
            className="splash-logo"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen; 