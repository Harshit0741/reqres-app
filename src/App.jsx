import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";
import EditUser from "./pages/EditUser";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default App;
