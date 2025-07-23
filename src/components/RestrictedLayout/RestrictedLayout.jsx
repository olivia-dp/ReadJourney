import { Outlet } from "react-router-dom";
import Navbar from "../NavBar/NavBar";

const RestrictedLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RestrictedLayout;