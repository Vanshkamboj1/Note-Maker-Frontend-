import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/route";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center p-4 bg-[#00111c]">
      <div className="bg-white/10 backdrop-blur-md border border-white/30 pt-3 p-8 rounded-xl shadow-lg max-w-lg w-full text-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center">About NoteFlow</h1>

        <div className="mb-8 pb-4 border-b border-gray-700">
          <p className="text-lg mb-4">
            At NoteFlow, we believe that ideas deserve to be captured,
            organized, and shared effortlessly.
          </p>
          <p className="text-lg">
            I'm a passionate developer and students from Chandigarh University,
            united by a simple goal — to build a note-taking experience that’s
            clean, intuitive, and truly helpful.
          </p>
          <p className="text-lg mt-4">
            My journey began with one problem: managing scattered notes across
            devices and apps. That’s when we decided to create NoteFlow — a
            minimalist, smart, and secure platform to help you take control of
            your thoughts.
          </p>
          <p className="text-lg mt-4">
            Every feature we build is centered around simplicity, productivity,
            and you — the creator, the student, the thinker.
          </p>
        </div>

        <div className="mb-8 pb-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold mb-3">💡 What I Value:</h2>
          <ul className="list-disc list-inside text-lg space-y-2 pl-4">
            <li>Clarity over clutter</li>
            <li>Privacy-first design</li>
            <li>Fast, responsive, and intuitive experience</li>
            <li>Built by students, for students</li>
          </ul>
        </div>

        <div className="mb-8 pb-4 border-b border-gray-700">
          <p className="text-lg">
            Whether you're preparing for exams, planning your startup, or
            journaling ideas at midnight — NoteFlow is here to support your
            flow.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-3">
            ✨ Built with ❤️ in India
          </h2>
          <p className="text-lg mb-4 text-gray-300">
            By students who dream big and build real.
          </p>
          <a
            href="mailto:info@notebase.com" // Placeholder email, update as needed
            className="bg-blue-600 disabled:hover:bg-blue-900 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg inline-block"
            title="Contact NoteBase via Email"
          >
            Contact Us
          </a>
          <p className="mt-4 text-gray-300">
            For support inquiries, please visit our
            <span
              onClick={() => {
                navigate(ROUTES.FAQ);
              }}
              className="text-blue-500 font-bold cursor-pointer"
            >
              {" "}
              Help & Support{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
