import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonImg, IonLabel } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { navigationTabs } from "../data/tabs/ContentsTabs";
import { useLocation } from "react-router-dom";
import { PatientProvider } from "../contexts/PatientsContext";
import { ProfileProvider } from "../contexts/ProfileContext";
import Tab1 from "../pages/Tab1";
import Tab2 from "../pages/Tab2";
import Tab3 from "../pages/Tab3";
import SaveTreatmentPlan from "../pages/TreatmentPlanForm";
import React from "react";
import CartProvider from "../contexts/CartContext";
import ProfilePreferences from "../pages/ProfilePreferences";

const Tabs: React.FC = () => {
  const location = useLocation();
  return (
    <ProfileProvider>
      <CartProvider>
        <PatientProvider>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tabs/tab1" component={Tab1} />
              <Route exact path="/tabs/tab2" component={Tab2} />
              <Route path="/tabs/tab2/save-treatmentplan" component={SaveTreatmentPlan} />
              <Route exact path="/tabs/tab3" component={Tab3} />
              <Route exact path="/tabs/profile-preferences" component={ProfilePreferences} />
              <Redirect exact from="/tabs" to="/tabs/tab1" />
            </IonRouterOutlet>

            <IonTabBar
              slot="bottom"
              className="bg-(--ion-background-containers) flex flex-row justify-between items-center px-7"
            >
              {navigationTabs.map((v) => (
                <IonTabButton
                  key={v.id}
                  tab={`tab${v.id}`}
                  href={v.path}
                  className="w-25  flex flex-col justify-center items-center text-center"
                >
                  <IonImg
                    src={v.imgUrl}
                    className={`h-8 ${
                      v.path === location.pathname ? "brightness-100" : "brightness-75"
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
        </PatientProvider>
      </CartProvider>
    </ProfileProvider>
  );
};

export default Tabs;
