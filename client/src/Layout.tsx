import { Outlet } from "react-router-dom";
import TopNav from "./top-nav";

const MainLayout = () => {
  return (
    <div>
      <TopNav />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
