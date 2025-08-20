import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Ellipsis, RotateCw, Trash2 } from "lucide-react";
import type { NoteType } from "../layouts/MainLayout";

interface TrashBarProps {
  selectedNote: NoteType | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<NoteType | null>>;
  notes: NoteType[];
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}

export const TrashBar = ({
  selectedNote,
  setSelectedNote,
  notes,
  setNotes,
}: TrashBarProps) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrashedNotes = async () => {
      try {
        const res = await axiosClient.get("/trash");
        setNotes(res.data.notes || []);
      } catch (err) {
        console.error("Error fetching trashed notes:", err);
      }
    };

    fetchTrashedNotes();
  }, [setNotes]);

  const handleNoteClick = async (noteId: string) => {
    try {
      const res = await axiosClient.get(`/trash/${noteId}`);
      setSelectedNote(res.data.note);
      setOpenDropdownId(null);
    } catch (err) {
      console.error("Error fetching note:", err);
    }
  };

  const handleUndelete = async (noteId: string) => {
    try {
      await axiosClient.put(`/trash/active/${noteId}`);
      setNotes((prev) => prev.filter((n) => n.noteId !== noteId));
      if (selectedNote?.noteId === noteId) setSelectedNote(null);
    } catch (err) {
      console.error("Error restoring note:", err);
    }
  };

  const handlePermanentDelete = async (noteId: string) => {
    try {
      await axiosClient.delete(`/trash/${noteId}`);
      setNotes((prev) => prev.filter((n) => n.noteId !== noteId));
      if (selectedNote?.noteId === noteId) setSelectedNote(null);
    } catch (err) {
      console.error("Permanent delete failed:", err);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axiosClient.delete("/trash");
      setNotes((prev) => prev.filter((n) => !n.trashed));
      setSelectedNote(null);
    } catch (err) {
      console.error("Delete all failed:", err);
    }
  };

  return (
    <div className="flex flex-col m-1 gap-2 overflow-y-auto text-white relative z-10">
      {notes.filter((n) => n.trashed).length > 0 && (
        <button
          onClick={handleDeleteAll}
          className="mb-2 ml-auto mr-2 text-sm text-white bg-red-500 px-3 py-1 rounded hover:bg-red-700"
        >
          Delete All
        </button>
      )}
      {notes
        .filter((note) => note.trashed)
        .map((note) => (
          <div
            key={note.noteId}
            className="relative bg-[#944444] hover:bg-[#c54f4f] rounded-sm p-3 text-white shadow transition duration-150 cursor-pointer overflow-visible z-20"
          >
            <div className="flex justify-between items-start dropdown-container">
             
              <div
                onClick={() => handleNoteClick(note.noteId)}
                className="font-semibold text-[17px] truncate max-w-[240px]"
                title={note.title}
              >
                {note.title || "Untitled"}
              </div>
              <div
                className="hover:text-red-200 cursor-pointer h-5 w-5"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdownId((prev) =>
                    prev === note.noteId ? null : note.noteId
                  );
                }}
              >
                <Ellipsis className="w-5 h-5" />
              </div>

              {openDropdownId === note.noteId && (
                <div className="absolute top-8 right-2 bg-white/10 border border-white/30 text-white backdrop-blur-lg shadow-lg rounded-md z-50 w-28 py-1">
                  <div
                    className="px-4 py-2 flex  justify-center items-center gap-2 hover:bg-white/20 cursor-pointer text-sm text-green-400"
                    onClick={() => handleUndelete(note.noteId)}
                  >
                    <div>
                      <RotateCw className="w-5 h-5 mt-0.5" />
                    </div>
                    <div>Restore</div>
                  </div>
                  <div
                    className="px-4 py-2 flex  justify-center items-center gap-2 hover:bg-white/20 cursor-pointer text-sm text-red-400"
                    onClick={() => handlePermanentDelete(note.noteId)}
                  >
                    <div>
                      <Trash2 className="w-5 h-5 mt-0.5" />
                    </div>
                    <div>Undelete</div>
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={() => handleNoteClick(note.noteId)}
              className="font-normal mt-3 text-[13px] bg-[rgba(100,0,0,0.3)] backdrop-blur-sm rounded-md px-2 py-1 h-[42px] overflow-hidden line-clamp-2"
            >
              {note.content
                ? JSON.parse(note.content)?.blocks?.[0]?.data?.text || ""
                : ""}
            </div>
          </div>
        ))}
    </div>
  );
};
