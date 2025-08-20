import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/route";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-[#0d1a42] shadow-lg py-2 px-6 md:px-12 rounded-b-xl sticky top-0 left-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="text-3xl font-bold text-[#6d7ff1] rounded-lg p-2 hover:text-[#4153cb] transition duration-300"
        >
          <div className="flex  justify-center items-center">
            <img src="../NoteLogo.png" alt="" className="h-14 w-14" />
            NoteFlow
          </div>
        </a>

        <div className="hidden md:flex space-x-8">
          <a
            href="#home"
            className="text-lg font-medium text-gray-300 hover:text-[#6d7ff1] transition duration-300 rounded-md px-3 py-1"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-lg font-medium text-gray-300 hover:text-[#6d7ff1] transition duration-300 rounded-md px-3 py-1"
          >
            Features
          </a>
          <a
            onClick={() => {
              navigate(ROUTES.LOGIN);
            }}
            className="text-lg font-medium text-gray-300 hover:text-[#6d7ff1] transition duration-300 rounded-md px-3 py-1"
          >
            SignIn
          </a>
          <a
            href="#contact"
            className="text-lg font-medium text-gray-300 hover:text-[#6d7ff1] transition duration-300 rounded-md px-3 py-1"
          >
            Contact
          </a>
        </div>

        <div className="md:hidden">
          <button
            className="text-gray-300 hover:text-[#6d7ff1] focus:outline-none"
            aria-label="Open navigation menu"
            title="Open navigation menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
