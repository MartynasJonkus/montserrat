import { Outlet } from "react-router-dom";
import TopNav from "./top-nav";

const MainLayout = () => {
  return (
      <>
          <TopNav />
          <div className="page-content">
              <Outlet />
          </div>
      </>
  );
};

export default MainLayout;
