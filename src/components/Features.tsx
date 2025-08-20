import {
  BookOpen,
  Lightbulb,
  Share2,
  ShieldCheck,
  CloudUpload,
  Clock9,
} from "lucide-react";

export const Features = () => {
  return (
    <section
      id="features"
      className="py-20 px-6 md:px-12 bg-[#0d1a42] rounded-xl shadow-lg mx-4 md:mx-auto max-w-6xl my-16"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-12 rounded-lg p-2">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-[#00111c] p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2 border border-[#4153cb]">
            <div className="flex justify-center mb-6">
              <BookOpen className="w-16 h-16 text-[#6d7ff1]" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Intuitive Note-Taking
            </h3>
            <p className="text-gray-300">
              Capture your thoughts quickly with a clean, distraction-free editor.
            </p>
          </div>

          <div className="bg-[#00111c] p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2 border border-[#4153cb]">
            <div className="flex justify-center mb-6">
              <Lightbulb className="w-16 h-16 text-[#6d7ff1]" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Smart Organization
            </h3>
            <p className="text-gray-300">
              Tag, categorize, and search your notes easily with powerful filters.
            </p>
          </div>

          <div className="bg-[#00111c] p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2 border border-[#4153cb]">
            <div className="flex justify-center mb-6">
              <Share2 className="w-16 h-16 text-[#6d7ff1]" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Seamless Collaboration
            </h3>
            <p className="text-gray-300">
              Instantly share notes with others and collaborate in real-time.
            </p>
          </div>

          <div className="bg-[#00111c] p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2 border border-[#4153cb]">
            <div className="flex justify-center mb-6">
              <ShieldCheck className="w-16 h-16 text-[#6d7ff1]" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Secure by Design
            </h3>
            <p className="text-gray-300">
              Your notes are encrypted and protected with strong authentication.
            </p>
          </div>

          <div className="bg-[#00111c] p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2 border border-[#4153cb]">
            <div className="flex justify-center mb-6">
              <CloudUpload className="w-16 h-16 text-[#6d7ff1]" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Cloud Sync
            </h3>
            <p className="text-gray-300">
              Access your notes anytime, anywhere — automatically synced to the cloud.
            </p>
          </div>

          <div className="bg-[#00111c] p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2 border border-[#4153cb]">
            <div className="flex justify-center mb-6">
              <Clock9 className="w-16 h-16 text-[#6d7ff1]" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Auto-Save & History
            </h3>
            <p className="text-gray-300">
              Never lose a thought — every change is saved with access to note history.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

