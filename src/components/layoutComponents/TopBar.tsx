import { AlignJustify, UserRound, X } from "lucide-react";
import { HiddenBar } from "./HiddenBar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/route";

interface topBarParam {
  hamburgerClicked: boolean;
  setHamburgerClicked: (value: boolean) => void;
  inTrash: boolean;
  setInTrash: (value: boolean) => void;
  fetchActiveNotes: () => void;
}
export const TopBar = ({
  hamburgerClicked,
  setHamburgerClicked,
  inTrash,
  setInTrash,
  fetchActiveNotes,
}: topBarParam) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fullName = user ? `${user.fname} ${user.lname}` : "?";
  const HiddenBarHandler = () => {
    setHamburgerClicked(!hamburgerClicked);
    return (
      <HiddenBar
        setHamburgerClicked={setHamburgerClicked}
        inTrash={inTrash}
        setInTrash={setInTrash}
        fetchActiveNotes={fetchActiveNotes}
      />
    );
  };
  return (
    <div className="topbar h-14 flex items-center justify-between   ">
      <div className="flex justify-between gap-15 lg:gap-40 items-center">
        <div onClick={HiddenBarHandler} className="w-4 h-4 cursor-pointer m-2">
          {hamburgerClicked ? (
            <X className="text-white " />
          ) : (
            <AlignJustify className="text-white" />
          )}
        </div>

        <div
          onClick={() => {
            navigate(ROUTES.LANDING);
          }}
          className="flex justify-center items-center cursor-pointer"
        >
          <img src="../../NoteLogo.png" alt="" className="w-12 h-12" />
          <div className="text-2xl font-bold text-primary">NoteFlow</div>
        </div>
      </div>

      <div
        onClick={() => {
          navigate(ROUTES.PROFILE);
        }}
        className="bg-white h-8 w-8 m-3 rounded-full cursor-pointer"
      >
        {user ? (
          <div className="flex justify-center items-center text-[18px] pt-0.5">
            {user ? fullName[0]?.toUpperCase() : "?"}
          </div>
        ) : (
          <div className="flex justify-center items-center pt-0.5">
            <UserRound />
          </div>
        )}
      </div>
    </div>
  );
};
