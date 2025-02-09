const Header = () => {
    return (
      <nav className="bg-gray-800 py-4">
        <div className="mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex items-center w-1/3 ">
              <h2 className="text-white text-lg font-bold">DQE</h2>
            </div>
            <div className="flex items-center justify-center w-1/3">
              <a href="/home" className="ml-6 text-gray-300 hover:text-white">
                Home
              </a>
              <a href="/model" className="ml-6 text-gray-300 hover:text-white">
                Solutions
              </a>
              <a href="/dashboards" className="ml-6 text-gray-300 hover:text-white">
                Dashboard
              </a>
            </div>
            
            <div className="flex items-center w-1/3 justify-end">
              <a href="/home" className="ml-6 text-gray-300 hover:text-white">
               Sign out
              </a>
           </div>
          </div>
        </div>
      </nav>
    );
};

export default Header;  