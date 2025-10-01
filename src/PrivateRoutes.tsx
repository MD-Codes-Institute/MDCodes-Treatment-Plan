// src/PrivateRoutes.tsx (Ajustado para a pasta "resources")

import React from 'react';
import { 
  IonTabs, 
  IonRouterOutlet, 
  IonTabBar, 
  IonTabButton, 
  IonImg, 
  IonLabel,
  IonPage,      
  IonHeader,
  IonToolbar,
  IonContent
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import './PrivateRoutes.css';

const PrivateRoutes: React.FC = () => (
  <IonPage className='ion-page'>
    
    <IonHeader>
      <IonToolbar>
       <IonImg className='logo-header' src='/resources/MdCodes_White.png' alt='Logo'></IonImg>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tabs/tab1" component={Tab1} />
          <Route exact path="/tabs/tab2" component={Tab2} />
          <Route exact path="/tabs/tab3" component={Tab3} />
          <Redirect exact from="/tabs" to="/tabs/tab1" />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tabs/tab1">
              <IonImg src="/resources/face-icon-20.svg" className="icons-tabs" />
              <IonLabel>MD Codes</IonLabel>
            </IonTabButton>

            <IonTabButton tab="tab2" href='/tabs/tab2'>
              <IonImg src="/resources/icon-flip-chart.svg" className="icons-tabs" />
              <IonLabel>Flip Chart</IonLabel>
            </IonTabButton>

            <IonTabButton tab="tab3" href="/tabs/tab3" layout="icon-end">
              <IonImg src="/resources/login.png" className="icons-tabs" />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonContent>

  </IonPage>
);

export default PrivateRoutes;