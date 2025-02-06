import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  
  //Récupérer l'état du menu (par défaut, fermé)
  const [isOpen, setIsOpen] = useState(false);
  //Récupérer l'emplacement actuel de la page
  const location = useLocation();

  //Fermer le menu lorsque l'emplacement de la page change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  //Fermer le menu lorsque l'utilisateur clique sur le menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-[#1E1E1E] fixed w-full z-20 top-0 start-0 border-b border-white-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/logo.png" className="h-11" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#66D97A]"></span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Ouvrir le menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 mr-20 font-medium border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 border-none w-full text-center">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 rounded md:p-0 md:hover:text-[#66D97A]"
                  aria-current="page"
                  onClick={() => setIsOpen(false)}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/chatbot"
                  className="block py-2 px-3  rounded md:hover:bg-transparent md:hover:text-[#66D97A] md:p-0"
                  onClick={() => setIsOpen(false)}
                >
                  Chatbot
                </Link>
              </li>
              <li>
                <Link
                  to="/presentation"
                  className="block py-2 px-3  rounded md:hover:bg-transparent md:hover:text-[#66D97A] md:p-0"
                  onClick={() => setIsOpen(false)}
                >
                  Présentation
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3  rounded md:hover:bg-transparent md:hover:text-[#66D97A] md:p-0"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
