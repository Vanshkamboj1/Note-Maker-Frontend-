import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/route";
interface hiddenBarProps {
  setHamburgerClicked: (value: boolean) => void;
  inTrash: boolean;
  setInTrash: (value: boolean) => void;
  fetchActiveNotes: () => void;
}

export const HiddenBar = ({
  setHamburgerClicked,
  inTrash,
  setInTrash,
  fetchActiveNotes,
}: hiddenBarProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-0 h-full overflow-y-auto text-primary text-[16px] justify-between items-center">
      <div className="flex flex-col w-full ">
        <div
          onClick={() => {
            fetchActiveNotes();
            setInTrash(false);
            setHamburgerClicked(false);
            navigate(ROUTES.NOTES);
          }}
          className="border-b w-full flex justify-center items-center"
        >
          <button className="p-3 font-bold cursor-pointer  hover:text-blue-500">
            AllNotes
          </button>
        </div>
        <div className="border-b w-full flex justify-center items-center">
          <button
            onClick={() => {
              setInTrash(true);
              setHamburgerClicked(false);
            }}
            className="p-3 font-bold cursor-pointer  hover:text-blue-500"
          >
            Trash
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 pb-2">
        <div className="flex flex-col ">
          <button
            onClick={() => {
              navigate(ROUTES.PROFILE);
            }}
            className="cursor-pointer hover:text-blue-500"
          >
            Profile
          </button>

          <button
            onClick={() => {
              navigate(ROUTES.SETTINGS);
            }}
            className="cursor-pointer hover:text-blue-500"
          >
            Settings
          </button>
        </div>

        <div
          onClick={() => {
            navigate(ROUTES.FAQ);
          }}
          className="cursor-pointer hover:text-blue-500"
        >
          Help & Support
        </div>
        <div
          onClick={() => {
            navigate(ROUTES.ABOUT);
          }}
          className="cursor-pointer hover:text-blue-500"
        >
          About
        </div>
      </div>
    </div>
  );
};
