import {
  IonApp,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";
import { ellipse, triangle } from "ionicons/icons";

import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import SignUp from "./pages/credentials/SignUp/SignUp";
import SignIn from "./pages/credentials/SignIn/SignIn";

import "./App.css";

/* Ionic CSS */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonImg
          src="../resources/MdCodes_White.png"
          alt="Logo"
          className="logo-header"
        ></IonImg>
      </IonToolbar>
    </IonHeader>
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          {/* Redirecionamento padrão */}
          <Route exact path="/" render={() => <Redirect to="/signin" />} />

          {/* Página de login */}
          <Route path="/signin" component={SignIn} />

          <Route path="/signup" component={SignUp} />

          {/* Tabs encapsuladas */}
          <Route
            path="/tabs"
            render={() => (
              <IonTabs>
                <IonRouterOutlet>
                  <Route path="/tabs/tab1" component={Tab1} exact />
                  <Route path="/tabs/tab2" component={Tab2} exact />
                  <Route path="/tabs/tab3" component={Tab3} exact />
                  <Redirect exact from="/tabs" to="/tabs/tab1" />
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                  <IonTabButton tab="tab1" href="/tabs/tab1">
                    <IonImg
                      src="../resources/face-icon-20.svg"
                      className="icons-tabs"
                    ></IonImg>
                    <IonLabel>MD Codes</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab2" href="/tabs/tab2">
                    <IonImg
                      src="../resources/icon-flip-chart.svg"
                      className="icons-tabs"
                    ></IonImg>
                    <IonLabel>Flip Chart</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="Tab3" href="/tabs/tab3">
                    <IonImg
                      src="../resources/login.png"
                      className="icons-tabs"
                    ></IonImg>
                    <IonLabel>Profile</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            )}
          />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;