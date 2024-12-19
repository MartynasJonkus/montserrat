import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";

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
