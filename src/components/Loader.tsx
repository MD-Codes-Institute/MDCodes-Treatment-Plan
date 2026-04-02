import { IonSpinner } from "@ionic/react";

const Loader = () => {
  return (
    <div className="fixed z-999 w-screen h-screen bg-(--ion-background-containers)">
      <IonSpinner name="circular" className="fixed z-999 h-full left-1/2 top[50%]"></IonSpinner>
    </div>
  );
};

export default Loader;
