import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const SettingsPage = () => {
  const { logout } = useAuth();
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("app-theme");
    return savedTheme ? savedTheme : "light";
  });

  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem("app-font-size");
    return savedFontSize ? savedFontSize : "medium";
  });

  const [receiveNotifications, setReceiveNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("app-notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : true;
  });

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("app-language");
    return savedLanguage ? savedLanguage : "English";
  });

  const [shareData, setShareData] = useState(() => {
    const savedShareData = localStorage.getItem("app-share-data");
    return savedShareData ? JSON.parse(savedShareData) : false;
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("app-theme", theme);

    document.documentElement.classList.remove(
      "text-sm",
      "text-base",
      "text-lg"
    );
    if (fontSize === "small") {
      document.documentElement.classList.add("text-sm");
    } else if (fontSize === "large") {
      document.documentElement.classList.add("text-lg");
    } else {
      document.documentElement.classList.add("text-base"); // medium default
    }
    localStorage.setItem("app-font-size", fontSize);

    localStorage.setItem(
      "app-notifications",
      JSON.stringify(receiveNotifications)
    );
    localStorage.setItem("app-language", language);
    localStorage.setItem("app-share-data", JSON.stringify(shareData));
  }, [theme, fontSize, receiveNotifications, language, shareData]); // Re-run effect when these states change

  interface ThemeChangeHandler {
    (newTheme: "light" | "dark"): void;
  }

  const handleThemeChange: ThemeChangeHandler = (newTheme) => {
    setTheme(newTheme);
  };

  interface FontSizeChangeHandler {
    (newSize: "small" | "medium" | "large"): void;
  }

  const handleFontSizeChange: FontSizeChangeHandler = (newSize) => {
    setFontSize(newSize);
  };

  const handleNotificationToggle = () => {
    setReceiveNotifications((prev: boolean) => !prev);
  };

  interface LanguageChangeEvent extends React.ChangeEvent<HTMLSelectElement> {}

  const handleLanguageChange = (e: LanguageChangeEvent) => {
    setLanguage(e.target.value);
  };

  const handleShareDataToggle = () => {
    setShareData((prev: boolean) => !prev);
  };

  return (
    <div className="flex  items-center justify-center h-full max-h-full w-full overflow-y-auto p-4 bg-[#00111c]">
      <div className="bg-white/10 h-155 backdrop-blur-md border border-white/30 pt-3 p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-100">
          Settings
        </h1>

        <div className="mb-6 pb-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold mb-3 text-gray-100">Theme</h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleThemeChange("light")}
              className={`px-6 py-2 rounded-lg font-medium transition duration-200 ease-in-out ${
                theme === "light"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`px-6 py-2 rounded-lg font-medium transition duration-200 ease-in-out ${
                theme === "dark"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="mb-6 pb-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold mb-3 text-gray-100">
            Font Size
          </h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleFontSizeChange("small")}
              className={`px-6 py-2 rounded-lg font-medium transition duration-200 ease-in-out ${
                fontSize === "small"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
            >
              Small
            </button>
            <button
              onClick={() => handleFontSizeChange("medium")}
              className={`px-6 py-2 rounded-lg font-medium transition duration-200 ease-in-out ${
                fontSize === "medium"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => handleFontSizeChange("large")}
              className={`px-6 py-2 rounded-lg font-medium transition duration-200 ease-in-out ${
                fontSize === "large"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
            >
              Large
            </button>
          </div>
        </div>

        <div className="mb-6 pb-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-100">
            Receive Notifications
          </h2>
          <label
            htmlFor="notification-toggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <label htmlFor="notification-toggle" className="sr-only">
                Receive Notifications
              </label>
              <input
                type="checkbox"
                id="notification-toggle"
                className="sr-only"
                checked={receiveNotifications}
                onChange={handleNotificationToggle}
                title="Receive Notifications"
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
                  receiveNotifications ? "translate-x-full bg-blue-600" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>

        <div className="mb-6 pb-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold mb-3 text-gray-100">Language</h2>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select Language"
            title="Select Language"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-100">
            Share Anonymous Data
          </h2>
          <label
            htmlFor="share-data-toggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <label htmlFor="share-data-toggle" className="sr-only">
                Share Anonymous Data
              </label>
              <input
                type="checkbox"
                id="share-data-toggle"
                className="sr-only"
                checked={shareData}
                onChange={handleShareDataToggle}
                title="Share Anonymous Data"
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
                  shareData ? "translate-x-full bg-blue-600" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>

        <div className="text-center mt-8">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Save Changes (Auto-saved)
          </button>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
