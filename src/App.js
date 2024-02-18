import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import TodosPage from "./pages/TodosPage";

// Create a separate functional component to use hooks
function WithNavigation({ children }) {
  let location = useLocation(); // Access the current location

  // Render Navigation if the path is not '/login'
  const showNavigation = location.pathname !== "/login";

  return (
    <>
      {showNavigation && <Navigation />}
      {children}
    </>
  );
}
function App() {
  return (
    <Router>
      <WithNavigation />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
