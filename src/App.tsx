import "./App.css";
import NavBar from "./Componets/NavBar/NavBar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Componets/Context/useAuth";

function App() {
  return (
    <>
      <UserProvider>
        <NavBar />
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
