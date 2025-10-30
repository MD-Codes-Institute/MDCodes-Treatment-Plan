import { IonPage, IonContent, IonText, IonInput } from "@ionic/react";
import "./Tab3.css"

const Tab3: React.FC = () => {
  return (
    
      <IonContent className="ion-padding">
        <IonText>Profile Settings</IonText>
        <IonText>Profile name: <IonInput></IonInput></IonText>
        <IonText>Profile e-mail: <IonInput></IonInput></IonText>
      </IonContent>
    
  );
};

export default Tab3;
