import logo_principal from "../../assets/images/logo_principal.png";
import OptionSidebar from "./OptionSidebar";
import { useAuth } from "../../contexts/AuthContext/AuthContext"; // Asegúrate de ajustar la ruta si es necesario
import { options } from "./options";
const Sidebar = ({ selectedTitle }) => {
  const { logout } = useAuth(); // Usar el contexto de autenticación para el cierre de sesión
  return (
    <aside className="sidebar w-64 md:shadow-right transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-[#363a40] flex flex-col justify-between">
      <div>
        <div className="sidebar-header flex items-center justify-center py-4">
          <div className="inline-flex">
            <a href="#" className="inline-flex flex-row items-center">
              <img src={logo_principal} alt="" className="w-10 h-10" />
              <span className="leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase">
                SCA
              </span>
            </a>
          </div>
        </div>
        <div className="sidebar-content px-4 py-6">
          <ul className="flex flex-col w-full">
            {options.map((option, index) => (
              <OptionSidebar
                key={index}
                text={option.text}
                icon={option.icon}
                to={option.to}
                isSelected={selectedTitle === option.text}
                options={option.options}
                selectedTitle={selectedTitle}
              />
            ))}
          </ul>
        </div>
      </div>

      {/* Botón de Cerrar Sesión */}
      <div className="sidebar-footer p-4">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 text-gray-100 bg-red-600 hover:bg-red-700 rounded-md transition-all duration-150 ease-in-out"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
