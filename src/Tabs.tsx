import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonImg,
  IonLabel,
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import { navigationTabs } from "./Contents/ContentsTabs/ContentsTabs";
import { useLocation } from "react-router-dom";
import VerifiedEmail from "./pages/auth/VerifiedEmail";

const Tabs: React.FC = () => {
  const location = useLocation();
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/tab1" component={Tab1} />
        <Route exact path="/tabs/tab2" component={Tab2} />
        <Route exact path="/tabs/tab3" component={Tab3} />
        <Route exact path="/verify-email" component={VerifiedEmail} />
        <Redirect exact from="/tabs" to="/tabs/tab1" />
      </IonRouterOutlet>

      <IonTabBar
        slot="bottom"
        className="bg-(--ion-background-containers) flex flex-row justify-between items-center px-7"
      >
        {navigationTabs.map((v, _) => (
          <IonTabButton
            key={v.id}
            tab={`tab${v.id}`}
            href={v.path}
            className="w-25  flex flex-col justify-center items-center text-center"
          >
            <IonImg
              src={v.imgUrl}
              className={`h-8 ${
                v.path === location.pathname
                  ? "brightness-100"
                  : "brightness-75"
              }`}
            />
            <IonLabel
              className={`text-[14px] sm:text-xl pt-1 whitespace-nowrap ${
                v.path === location.pathname ? "text-white" : "text-[#ccc]"
              }`}
            >
              {v.name}
            </IonLabel>
          </IonTabButton>
        ))}
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
