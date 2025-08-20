import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../axiosClient";
import { BACKEND_URL } from "../utils";

const Profile = () => {
  const { user, logout } = useAuth();
  const [firstName, setFirstName] = useState<string | null>(user?.fname || "");
  const [lastName, setLastName] = useState<string | null>(user?.lname || "");
  const [email, setEmail] = useState<string | null>(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState<string | null>("");
  const [editLastName, setEditLastName] = useState<string | null>("");

  useEffect(() => {
    if (isEditing) {
      setEditFirstName(firstName);
      setEditLastName(lastName);
    }
  }, [isEditing, firstName, lastName]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (editFirstName?.trim() === "" || editLastName?.trim() === "") {
      console.error("First name and last name cannot be empty.");
      return;
    }
    const trimmedFirst = (editFirstName ?? "").trim();
    const trimmedLast = (editLastName ?? "").trim();

    const res = await axiosClient.put(`${BACKEND_URL}/profile`, {
      fname: trimmedFirst,
      lname: trimmedLast,
    });
    console.log(res);

    setFirstName(trimmedFirst);
    setLastName(trimmedLast);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const userInitial = firstName?.charAt(0).toUpperCase();

  return (
    <div className="flex flex-1 items-center justify-center  h-[calc(100vh-4rem)] overflow-y-auto  p-4 bg-[#00111c]">
      <div className="bg-white/10 backdrop-blur-md border border-white/30 p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
        <div className="relative w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-5xl font-bold border-4 border-white shadow-md">
          <span>{userInitial}</span>
        </div>

        <div className="mb-2">
          {isEditing ? (
            <div className="flex flex-col items-center space-y-2">
              <input
                type="text"
                id="edit-first-name"
                className="editable-input border border-gray-300 p-2 rounded-lg w-full text-center text-3xl font-semibold text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
                placeholder="First Name"
                value={editFirstName ?? ""}
                onChange={(e) => setEditFirstName(e.target.value)}
              />
              <input
                type="text"
                id="edit-last-name"
                className="editable-input border border-gray-300 p-2 rounded-lg w-full text-center text-3xl font-semibold text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
                placeholder="Last Name"
                value={editLastName ?? ""}
                onChange={(e) => setEditLastName(e.target.value)}
              />
            </div>
          ) : (
            <h1
              id="display-name"
              className="text-3xl font-semibold text-gray-100"
            >
              {`${firstName} ${lastName}`}
            </h1>
          )}
        </div>

        <p id="user-email" className="text-lg text-gray-300 mb-6">
          {email}
        </p>

        <div className="flex flex-col space-y-3">
          {isEditing ? (
            <div className="flex space-x-3 justify-center">
              <button
                id="save-btn"
                onClick={handleSaveClick}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md flex-1"
              >
                Save
              </button>
              <button
                id="cancel-btn"
                onClick={handleCancelClick}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md flex-1"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex space-x-3 justify-center">
              <button
                id="edit-profile-btn"
                onClick={handleEditClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                Edit Profile
              </button>
              <button
                id="logout-btn"
                onClick={logout}
                className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
