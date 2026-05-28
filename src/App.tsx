import { IonApp, IonLoading, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import SignIn from "./pages/auth/sign-in/SignIn";
import SignUp from "./pages/auth/sign-up/SignUp";
import { ProtectedRoute } from "./ProtectedRoute";
import Tabs from "./Tabs";
import "./App.css";
import VerifiedEmail from "./pages/auth/VerifiedEmail";
import reauthenticateUser from "./pages/auth/ReauthForm";
import EditProfileInfo from "./components/tab3/EditProfile";
import AuthProvider, { useAuth } from "./contexts/AuthContext";

const AppContents: React.FC = () => {
  const { loading, user } = useAuth();
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

          <Route path="/re-authenticate" component={reauthenticateUser} />
          <Route exact path="/verify-email" component={VerifiedEmail} />
          <Route path="/edit-profile" component={EditProfileInfo} />
          <IonLoading isOpen={loading} message="Loading..." />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContents />
    </AuthProvider>
  );
};

export default App;
