import { Star } from "lucide-react";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-6 md:px-12 bg-[#00111c]">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-12 rounded-lg p-2">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          <div className="bg-[#0d1a42] p-8 rounded-2xl shadow-md transform hover:scale-105 transition duration-300 ease-in-out border border-[#4153cb]">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-300 italic mb-6">
              "NoteFlow has made my project documentation so much easier. Clean UI and powerful features — perfect combo!"
            </p>
            <p className="font-semibold text-[#6d7ff1]">
              - Aditi Sharma, Software Engineer
            </p>
          </div>

          <div className="bg-[#0d1a42] p-8 rounded-2xl shadow-md transform hover:scale-105 transition duration-300 ease-in-out border border-[#4153cb]">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-300 italic mb-6">
              "I use NoteFlow daily to organize my study notes. The sharing feature is super useful for group studies."
            </p>
            <p className="font-semibold text-[#6d7ff1]">
              - Rahul Verma, B.Tech Student at NIT
            </p>
          </div>

          <div className="bg-[#0d1a42] p-8 rounded-2xl shadow-md transform hover:scale-105 transition duration-300 ease-in-out border border-[#4153cb]">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-300 italic mb-6">
              "Perfect for my writing. I draft all my blogs and content ideas here before publishing. Loving the simplicity!"
            </p>
            <p className="font-semibold text-[#6d7ff1]">
              - Meenal Joshi, Content Creator
            </p>
          </div>

          <div className="bg-[#0d1a42] p-8 rounded-2xl shadow-md transform hover:scale-105 transition duration-300 ease-in-out border border-[#4153cb]">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-300 italic mb-6">
              "I’ve used many note apps, but NoteFlow just feels right — fast, responsive, and thoughtfully designed."
            </p>
            <p className="font-semibold text-[#6d7ff1]">
              - Kunal Mehra, UX Designer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
