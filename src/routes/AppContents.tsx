import { IonApp, IonRouterOutlet, IonPage } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import SignIn from "../pages/auth/sign-in/SignIn";
import SignUp from "../pages/auth/sign-up/SignUp";
import { ProtectedRoute } from "./ProtectedRoute";
import Tabs from "./Tabs";
import "../App.css";
import VerifiedEmail from "../pages/auth/VerifiedEmail";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const AppContents: React.FC = () => {
  const { user, loading } = useAuth();

  if(loading) {return( <Loader />)} 
  return (
    <IonApp>
      <IonPage>
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
              render={() => (user ? <VerifiedEmail /> : <Redirect to="/signup" />)}
            />

            <ProtectedRoute
              path="/tabs"
              isAllowed={!!user}
              isVerify={!!user?.emailVerified}
              redirectTo="/signin"
              component={Tabs}
            />

            <Route exact path="/">
              {user?.emailVerified ? <Redirect to="/tabs" /> : <Redirect to="/signin" />}
            </Route>

          </IonRouterOutlet>
        </IonReactRouter>
      </IonPage>
    </IonApp>
  );
};
export default AppContents;
