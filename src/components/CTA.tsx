export const CTA = () => {
  return (
    <section className="py-20 px-6 md:px-12 text-center bg-[#4153cb] text-white rounded-xl shadow-lg mx-4 md:mx-auto max-w-6xl my-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 rounded-lg p-2">
          Ready to Streamline Your Notes?
        </h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto rounded-lg p-2">
          Join thousands of users who are boosting their productivity with
          NoteFlow.
        </p>
        <button className="bg-white hover:bg-gray-100 text-[#4153cb] font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white">
          Get Started Now
        </button>
      </div>
    </section>
  );
};
