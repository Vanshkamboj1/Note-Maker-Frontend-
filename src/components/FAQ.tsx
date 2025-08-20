import { useState } from "react";

const faqs = [
  {
    question: "How do I change my profile picture?",
    answer:
      "Right now, your profile shows your name’s first letter — uploading a photo isn’t supported yet.",
  },
  {
    question: "How can I update my email address?",
    answer:
      "To update your email, please contact our support team — direct changes are not available yet.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, your data is encrypted and stored securely — we follow modern security best practices.",
  },
  {
    question: "What if I forget my password?",
    answer:
      "Click on ‘Forgot Password’ from the login page and follow the instructions to reset it.",
  },
  {
    question: "How do I report a bug?",
    answer:
      "You can report bugs using the 'Contact Support' form — screenshots or steps help a lot!",
  },
  {
    question: "Can I use the app on mobile?",
    answer:
      "Yes! Our app is fully responsive and works well on both mobile and tablet devices.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "If you wish to delete your account permanently, please contact support — they’ll guide you.",
  },
  {
    question: "Can I recover deleted notes?",
    answer:
      "Yes, trashed notes can be restored from the Trash section unless permanently deleted.",
  },
  {
    question: "How do I create a new note?",
    answer:
      "Just click the ‘New Note’ button in the sidebar — your editor will open instantly.",
  },
  {
    question: "Can I share my notes with others?",
    answer:
      "Yes, each note has a 'Share' option that creates a public link for others to view.",
  },
  {
    question: "Why can't I edit shared notes?",
    answer:
      "Shared notes are read-only — only the original owner can make edits from their account.",
  },
  {
    question: "Does the app autosave my work?",
    answer:
      "Yes, your notes are saved automatically as you type — no need to press save each time.",
  },
  {
    question: "Can I switch between light and dark mode?",
    answer:
      "Yes, head over to Settings to toggle between light and dark themes anytime.",
  },
  {
    question: "Will I lose data if I close the tab?",
    answer:
      "No, your changes are saved in real-time — you’re safe to close or refresh the tab.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Scroll down to the bottom of this page — you’ll find our Contact Support form there.",
  },
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null); // State to manage open/close of FAQ items

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div className="flex items-center justify-center  overflow-y-auto p-4 bg-[#00111c]">
      <div className="bg-white/10 backdrop-blur-md border border-white/30 pt-3 p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">
          Help & Support
        </h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for help articles..."
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search help articles"
            title="Search help articles"
          />
        </div>

        <div className="mb-8 pb-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/5 p-4 rounded-lg border border-white/10"
                >
                  <button
                    type="button"
                    aria-label="FAQ toggle"
                    className="w-full text-left flex justify-between items-center text-gray-100 font-medium text-lg"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openFAQIndex === index ? true : false}
                    aria-controls={`faq-answer-${index}`}
                  >
                    {faq.question}
                    <span className="text-xl">
                      {openFAQIndex === index ? "−" : "+"}
                    </span>
                  </button>

                  {openFAQIndex === index && (
                    <p
                      id={`faq-answer-${index}`}
                      className="mt-2 text-gray-300"
                    >
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-300 text-center">
                No FAQs found matching your search.
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">
            Contact Support
          </h2>
          <p className="text-gray-300 mb-3">
            Can't find what you're looking for? Reach out to our support team.
          </p>
          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="noteflow:support@gmail.com"
                className="text-blue-400 hover:underline"
              >
                support.noteflow@gmail.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+1234567890"
                className="text-blue-400 hover:underline"
              >
                +1 (234) 567-890
              </a>
            </p>
            <p>
              <strong>Hours:</strong> Mon-Fri, 9 AM - 5 PM (Your Time Zone)
            </p>
          </div>
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg w-full">
            Submit a Support Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
