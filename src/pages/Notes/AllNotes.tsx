import { useOutletContext } from "react-router-dom";
import { Editor } from "../../components/Editor";
import type { NoteType } from "../../layouts/MainLayout";

type ContextType = {
  title: string;
  content: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  selectedNote: NoteType | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<NoteType | null>>;
  titleRef: React.RefObject<HTMLInputElement>;
  notes: NoteType[];
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
  handleCreateNewNote: () => void;
};

export const AllNotes = () => {
  const {
    title,
    content,
    setTitle,
    setContent,
    selectedNote,
    setSelectedNote,
    titleRef,
    notes,
    setNotes,
    handleCreateNewNote,
  } = useOutletContext<ContextType>();

  return (
    <Editor
      selectedNote={selectedNote}
      setSelectedNote={setSelectedNote}
      titleRef={titleRef}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      notes={notes}
      setNotes={setNotes}
      handleCreateNewNote={handleCreateNewNote}
    />
  );
};
