// App.tsx (Versão Final Refatorada)

import {
  IonApp,
  IonSpinner,
  
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebaseConfig";


import PrivateRoutes from "./PrivateRoutes"; 
import PrivateRoute from "./components/PrivateRoute"; 
import SignIn from "./pages/credentials/SignIn/SignIn";
import SignUp from "./pages/credentials/SignUp/SignUp";
import "./App.css";


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setCheckingStatus(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingStatus) {
    return (
      <IonApp>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <IonSpinner />
        </div>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          
          <PrivateRoute path="/tabs" component={PrivateRoutes} user={user} />

          <Route exact path="/">
            {user ? <Redirect to="/tabs" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;