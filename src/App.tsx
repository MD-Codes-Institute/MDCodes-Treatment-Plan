// App.tsx (Versão Final Refatorada)

import { IonApp, IonLoading, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import useAuth from "./pages/auth/UseAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import Tabs from "./Tabs";
import "./App.css";
import VerifiedEmail from "./pages/auth/VerifiedEmail";

const App: React.FC = () => {
  const { user, loading, sendVerification } = useAuth();

  if (loading) return <IonLoading />;
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            exact
            path="/signin"
            render={() =>
              user?.emailVerified ? (
                <Redirect to="/tabs" />
              ) : user ? (
                <Redirect to="/verify-email" />
              ) : (
                <SignIn />
              )
            }
          />

          <Route
            exact
            path="/signup"
            render={() =>
              user?.emailVerified ? (
                <Redirect to="/tabs" />
              ) : user ? (
                <Redirect to="/verify-email" />
              ) : (
                <SignUp />
              )
            }
          />

          <Route
            exact
            path="/verify-email"
            render={() =>
              user ? <VerifiedEmail /> : <Redirect to="/signup" />
            }
          />

          <ProtectedRoute
            path="/tabs"
            isAllowed={!!user}
            isVerify={!!user?.emailVerified}
            redirectTo="/signin"
            component={Tabs}
          />

          <Route exact path="/">
            {user?.emailVerified ? (
              <Redirect to="/tabs" />
            ) : (
              <Redirect to="/signin" />
            )}
          </Route>

          <IonLoading isOpen={loading} message="Loading..." />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
