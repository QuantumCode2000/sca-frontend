const Navbar = ({ nombre, rol }) => {
  return (
    <header className="header bg-white shadow py-4 px-4">
      <div className="header-content flex items-center flex-row">
        <div className="flex ml-auto">
          <a className="flex flex-row items-center">
            <img
              src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp"
              className="h-10 w-10 bg-gray-200 border rounded-full"
            />
            <span className="flex flex-col ml-2">
              <span className="truncate w-20 h-4 font-semibold tracking-wide leading-none">
                {nombre}
              </span>
              <span className="truncate w-20 h-4 text-gray-500 text-xs leading-none">
                {rol}
              </span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
