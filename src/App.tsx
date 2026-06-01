
import AppContents from "./routes/AppContents";
import AuthProvider from "./contexts/AuthContext";
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContents />
    </AuthProvider>
  );
};

export default App;
