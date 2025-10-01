// App.tsx (Versão Final Refatorada)

import {
  IonApp,
  IonSpinner,
  // ... outros imports do Ionic ...
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebaseConfig";

// Importe suas páginas e o novo PrivateRoute
import PrivateRoutes from "./PrivateRoutes"; // Vamos criar este wrapper a seguir
import PrivateRoute from "./components/PrivateRoute"; // O que acabamos de criar
import SignIn from "./pages/credentials/SignIn/SignIn";
import SignUp from "./pages/credentials/SignUp/SignUp";
import "./App.css";
// ... seus imports de CSS ...

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
          {/* Rotas Públicas */}
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />

          {/* Rota Privada para as Tabs */}
          {/* O PrivateRoute vai decidir se mostra as Tabs ou redireciona para /signin */}
          <PrivateRoute path="/tabs" component={PrivateRoutes} user={user} />

          {/* Redirecionamento Inicial */}
          {/* Se carregar na raiz '/', decida para onde ir */}
          <Route exact path="/">
            {user ? <Redirect to="/tabs" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;