import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import SignupPage from "./pages/user-service/SignupPage";
import MatchSelectionPage from "./pages/matching-service/MatchSelectionPage";
import LoginPage from "./pages/user-service/LoginPage";
import MatchRoomPage from "./pages/matching-service/MatchRoomPage";
import UserContext from "./UserContext";
import { useLocalStorage } from "./useLocalStorage";

function App() {
  const [token, setToken] = useLocalStorage("token", "");
  const [user, setUser] = useLocalStorage("user", {});

  const handleStoreUserData = (token, user) => {
    setToken(token);
    setUser(user);
  };

  const handleClearUserData = () => {
    setToken("");
    setUser({});
  };

  return (
    <ChakraProvider>
      <div className="App">
        <UserContext.Provider
          value={{
            token: token,
            user: user,
            storeUserData: handleStoreUserData,
            clearUserData: handleClearUserData,
          }}
        >
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={<Navigate replace to="/login" />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/matchselection" element={<MatchSelectionPage />} />
              <Route path="/matchroom" element={<MatchRoomPage />} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </div>
    </ChakraProvider>
  );
}

export default App;
