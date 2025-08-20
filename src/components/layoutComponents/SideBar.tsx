import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  Ellipsis,
  PlusCircle,
  SquarePen,
  Trash,
} from "lucide-react";
import type { NoteType } from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  title: string;
  content: string;
  selectedNote: NoteType | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<NoteType | null>>;
  onCreateNew: () => void;
  notes: NoteType[];
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}

export const SideBar = ({
  selectedNote,
  setSelectedNote,
  onCreateNew,
  notes,
  setNotes,
}: SideBarProps) => {
  const navigate = useNavigate();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [sortOrderAsc, setSortOrderAsc] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setOpenDropdownId(null);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleNoteClick = async (note: NoteType) => {
    try {
      const res = await axiosClient.get(`/notes/${note.noteId}`);
      setSelectedNote(res.data.note);
      navigate(`/app/notes/${note.noteId}`);
    } catch (err) {
      console.error("Failed to fetch selected note:", err);
    } finally {
      setOpenDropdownId(null);
    }
  };

  const handleThreeDots = (noteId: string) => {
    setOpenDropdownId((prev) => (prev === noteId ? null : noteId));
  };

  const handleEdit = (note: NoteType) => {
    handleNoteClick(note);
  };

  const handleDelete = async (noteId: string) => {
    try {
      const res = await axiosClient.put(`/trash/${noteId}`);
      setNotes((prev) =>
        prev.map((note) =>
          note.noteId === noteId ? { ...note, trashed: true } : note
        )
      );
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  return (
    <div>
      <div className="text-zinc-100 pt-1 ml-1 flex justify-between mr-1 border-b-1 pb-2 top-0 left-0 sticky z-20 bg-blue-950">
        <div className="flex justify-center items-center">
          <button aria-label="newNote" onClick={onCreateNew}>
            <PlusCircle className="w-8 h-8 hover:text-zinc-400 cursor-pointer" />
          </button>
          <div className="hidden lg:block ml-1">Create New</div>
        </div>
        {sortOrderAsc ? (
          <CalendarArrowDown
            className="w-8 h-8 hover:text-zinc-400 cursor-pointer"
            onClick={() => setSortOrderAsc(false)}
          />
        ) : (
          <CalendarArrowUp
            className="w-8 h-8 hover:text-zinc-400 cursor-pointer"
            onClick={() => setSortOrderAsc(true)}
          />
        )}
      </div>

      <div className="flex flex-col m-1 gap-2 overflow-y-auto">
        {selectedNote && selectedNote.noteId === "" && (
          <div className="filename text-white h-24 rounded-sm p-2 bg-[#3a506b]">
            <div className="font-bold text-[17px] lg:text-[18px]">
              {selectedNote.title || "Untitled"}
            </div>
            <div className="font-normal mt-4 text-[13px] lg:text-[14px] p-0.5 bg-[rgba(39,56,112,0.4)] backdrop-blur-sm rounded-md px-1 h-[40px] overflow-hidden text-ellipsis">
              {selectedNote.content
                ? JSON.parse(selectedNote.content)?.blocks?.[0]?.data?.text ||
                  ""
                : ""}
            </div>
          </div>
        )}
        {notes
          .filter((note) => !note.trashed)
          .sort((a, b) => {
            const dateA = new Date(a.updatedAt).getTime();
            const dateB = new Date(b.updatedAt).getTime();
            return sortOrderAsc ? dateA - dateB : dateB - dateA;
          })
          .map((note) => (
            <div
              key={note.noteId}
              className="relative bg-[#0d5dbf] hover:bg-[rgb(109,110,198)] rounded-sm p-3 text-white shadow-sm transition-all duration-150 ease-in-out cursor-pointer"
            >
              <div className="flex justify-between items-start dropdown-container">
                <div
                  onClick={() => handleNoteClick(note)}
                  className="font-semibold text-[17px] lg:text-[18px] truncate max-w-[180px] sm:max-w-[240px] md:max-w-[270px]"
                  title={note.title}
                >
                  {note.title || "Untitled"}
                </div>
                <div
                  className="hover:text-blue-300 cursor-pointer h-5 w-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleThreeDots(note.noteId);
                  }}
                >
                  <Ellipsis className="w-5 h-5" />
                </div>

                {openDropdownId === note.noteId && (
                  <div className="absolute top-8 right-2 bg-white/10 border border-white/30 text-white backdrop-blur-lg shadow-lg rounded-md z-50 w-28 py-1">
                    <div
                      className="px-4 py-2 flex  items-center justify-center gap-3  hover:bg-white/20 cursor-pointer text-sm"
                      onClick={() => handleEdit(note)}
                    >
                      <div>
                        <SquarePen className="h-4 w-4 mt-0.5" />
                      </div>
                      <div className="font-semibold">Edit</div>
                    </div>
                    <div
                      className="px-4 py-2 flex  items-center justify-center gap-3 hover:bg-white/20 cursor-pointer text-sm text-red-400"
                      onClick={() => handleDelete(note.noteId)}
                    >
                      <div>
                        <Trash className="h-4 w-4 mt-0.5" />
                      </div>
                      <div className="font-semibold">Trash</div>
                    </div>
                  </div>
                )}
              </div>

              <div
                onClick={() => handleNoteClick(note)}
                className="font-normal mt-3 text-[13px] lg:text-[14px] bg-[rgba(39,56,112,0.4)] backdrop-blur-sm rounded-md px-2 py-1 h-[42px] overflow-hidden text-ellipsis line-clamp-2"
              >
                {note.content
                  ? JSON.parse(note.content)?.blocks?.[0]?.data?.text || ""
                  : ""}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
