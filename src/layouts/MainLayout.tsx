import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { TopBar } from "../components/layoutComponents/TopBar";
import { HiddenBar } from "../components/layoutComponents/HiddenBar";
import { SideBar } from "../components/layoutComponents/SideBar";
import axiosClient from "../axiosClient";
import { TrashBar } from "../components/TrashBar";
import { useAuth } from "../context/AuthContext";
import { LoadingScreen } from "../components/LoadingPage";
import { ROUTES } from "../constants/route";

export type NoteType = {
  noteId: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isShared: boolean;
  trashed: boolean;
  publicId?: string | null;
};

const MainLayout = () => {
  const [hamburgerClicked, setHamburgerClicked] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [inTrash, setInTrash] = useState<boolean>(false);

  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to={ROUTES.LOGIN} />;

  const fetchActiveNotes = async () => {
    try {
      const res = await axiosClient.get("/notes");
      const sorted = res.data.notes
        .filter((note: NoteType) => !note.trashed)
        .sort(
          (a: NoteType, b: NoteType) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

      setNotes(sorted);

      if (sorted.length > 0) {
        const latest = sorted[0];
        setSelectedNote(latest);
        setTitle(latest.title);
        setContent(latest.content);
      } else {
        setSelectedNote(null);
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  //  Fetch once on mount
  useEffect(() => {
    fetchActiveNotes();
  }, []);

  const handleCreateNewNote = () => {
    setSelectedNote({
      noteId: "",
      title: "",
      content: "",
      userId: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isShared: false,
      trashed: false,
      publicId: null,
    });
    setTitle("");
    setContent("");
    setTimeout(() => {
      titleRef.current?.focus();
    }, 0);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="shrink-0 z-10">
        <TopBar
          hamburgerClicked={hamburgerClicked}
          setHamburgerClicked={setHamburgerClicked}
          inTrash={inTrash}
          setInTrash={setInTrash}
          fetchActiveNotes={fetchActiveNotes}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {hamburgerClicked ? (
          <div className="w-1/4 sidebar border-r-2 border-zinc-400 overflow-y-auto ">
            <HiddenBar
              setHamburgerClicked={setHamburgerClicked}
              inTrash={inTrash}
              setInTrash={setInTrash}
              fetchActiveNotes={fetchActiveNotes}
            />
          </div>
        ) : (
          <div className="w-1/4 sidebar border-r-2 border-zinc-400 overflow-y-auto">
            {inTrash ? (
              <TrashBar
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
                notes={notes}
                setNotes={setNotes}
              />
            ) : (
              <SideBar
                title={title}
                content={content}
                onCreateNew={handleCreateNewNote}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
                notes={notes}
                setNotes={setNotes}
              />
            )}
          </div>
        )}
        <main className="flex-1 bg-main overflow-y-auto">
          <Outlet
            context={{
              selectedNote,
              setSelectedNote,
              titleRef,
              title,
              setTitle,
              content,
              setContent,
              notes,
              setNotes,
              handleCreateNewNote,
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
