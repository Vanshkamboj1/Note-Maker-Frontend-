export const Footer = () => {
  return (
    <footer className="bg-[#0d1a42] text-white py-10 px-6 md:px-12 ">
        <div className="container mx-auto text-center md:flex md:justify-between md:items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-lg font-semibold">NoteFlow</p>
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
            <a href="#" className="text-gray-300 hover:text-[#6d7ff1] transition duration-300 rounded-md px-2 py-1">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-[#6d7ff1] transition duration-300 rounded-md px-2 py-1">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-[#6d7ff1] transition duration-300 rounded-md px-2 py-1">Support</a>
          </div>
        </div>
      </footer>
  )
}
