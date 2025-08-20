import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/route";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="py-20 px-6 md:px-12 text-center">
      <div className="container mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white mb-6 rounded-lg p-2">
          Organize Your Thoughts, Effortlessly.
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto rounded-lg p-2">
          NoteFlow helps you capture ideas, manage tasks, and collaborate
          seamlessly. Your ultimate digital notebook.
        </p>
        <button
          onClick={() => {
            navigate(ROUTES.LOGIN);
          }}
          className="bg-[#6d7ff1] hover:bg-[#4153cb] text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#6d7ff1]/50"
        >
          Signup Now
        </button>
      </div>
    </section>
  );
};
