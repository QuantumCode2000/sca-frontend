import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { options } from "../components/Sidebar/options";

const Layout = () => {
  const location = useLocation();

  const findSelectedTitle = (options, path) => {
    for (const option of options) {
      if (option.options) { 
        const subOption = option.options.find((sub) => sub.to === path);
        if (subOption) {
          return subOption.text;
        }
      }
    }
    return null;
  };

  const usuarioActual = JSON.parse(localStorage.getItem("user") || "{}");

  const selectedTitle = findSelectedTitle(options, location.pathname);

  return (
    <>
      <div className="flex flex-grow min-h-screen bg-gray-100 text-gray-800 ">
        <Sidebar selectedTitle={selectedTitle} />
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <Navbar nombre={usuarioActual.nombre} rol={usuarioActual.rol} />

          <div className="main-content flex flex-col flex-grow p-4">
            <h1 className="font-bold text-2xl text-gray-700">
              {selectedTitle}
            </h1>

            <div className="flex flex-col flex-grow border-1 border-gray-400  bg-white  rounded mt-4 p-10 shadow-md">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
