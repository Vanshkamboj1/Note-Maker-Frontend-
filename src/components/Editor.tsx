import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Quote from "@editorjs/quote";

import type { NoteType } from "../layouts/MainLayout";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";
import { CloudUpload } from "lucide-react";
import { Share2 } from "lucide-react";
import { DownloadButton } from "./DownloadBtn";

interface EditorProps {
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
}

export const Editor = ({
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
}: EditorProps) => {
  const ejInstance = useRef<EditorJS | null>(null);
  const [editorReady, setEditorReady] = useState(false);
  const navigate = useNavigate();
  const isTrashed = selectedNote?.trashed ?? false;
  useEffect(() => {
    if (!selectedNote) {
      console.warn("No selected note. Editor not initialized.");
      return;
    }

    const holder = document.getElementById("editorjs");
    if (holder) holder.innerHTML = "";
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        list: List,
        code: Code,
        quote: Quote,
      },
      data: selectedNote.content
        ? JSON.parse(selectedNote.content)
        : { blocks: [] },
      readOnly: isTrashed,
      placeholder: "Start writing your content...",
      async onChange(api) {
        const savedData = await api.saver.save();
        setSelectedNote((prev) =>
          prev ? { ...prev, content: JSON.stringify(savedData) } : prev
        );
      },
    });

    editor.isReady
      .then(() => {
        ejInstance.current = editor;
        setEditorReady(true);
      })
      .catch((err) => {
        console.error("Editor init failed:", err);
      });

    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
          ejInstance.current = null;
          setEditorReady(false);
        })
        .catch((err) => {
          console.error("ditor cleanup error:", err);
        });
    };
  }, [selectedNote?.noteId]);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      setContent(selectedNote.content || "");
    }
  }, [selectedNote]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    setSelectedNote((prev) => (prev ? { ...prev, title: value } : prev));
  };

  const handleSave = async () => {
    if (!ejInstance.current) {
      return;
    }

    try {
      await ejInstance.current.isReady;
      const contentData = await ejInstance.current.save();
      const contentJSON = JSON.stringify(contentData);
      const payload = {
        title: title.trim() || "Untitled",
        content: contentJSON,
      };

      if (selectedNote?.noteId) {
        const res = await axiosClient.put(
          `/notes/${selectedNote.noteId}`,
          payload
        );
        const updatedNote = res.data.note;

        setSelectedNote(updatedNote.noteId);
        setContent(updatedNote.content);
        setNotes((prev) =>
          prev.map((n) => (n.noteId === updatedNote.noteId ? updatedNote : n))
        );
      } else {
        const res = await axiosClient.post("/notes", payload);
        const createdNote = res.data.note;

        setSelectedNote(createdNote);
        setContent(createdNote.content);
        setNotes((prev) => [createdNote, ...prev]);
        navigate(`/app/notes/${createdNote.noteId}`);
        
      }
    } catch (err) {
      console.error(" Save failed:", err);
    }
  };

  const handleShare = async () => {
    if (!selectedNote?.noteId) return;
    try {
      const res = await axiosClient.post(`/share/${selectedNote.noteId}`);
      const publicId = res.data.publicId;
      const url = `${window.location.origin}/public/${publicId}`;
      await navigator.clipboard.writeText(url);
      alert("🔗 Public link copied to clipboard:\n" + url);
    } catch (err) {
      console.error("Share failed:", err);
    }
  };
  if (!selectedNote) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center text-gray-300 p-6 bg-[#112233] rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-2">No note selected</h2>
        <p className="mb-4">Looks like you haven’t created any notes yet.</p>
        <button
          onClick={handleCreateNewNote}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md transition"
        >
          Create your first note
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl flex flex-col overflow-hidden mx-auto mt-8 px-4 py-6 text-white rounded-xl shadow bg-[#112233]">
      <input
        ref={titleRef}
        type="text"
        value={title}
        disabled={isTrashed}
        onChange={handleTitleChange}
        placeholder="Enter note title..."
        className="w-full p-3 border-b border-zinc-500 text-2xl font-semibold bg-transparent outline-none mb-4"
      />

      <div className="flex justify-end gap-3 mb-4 flex-wrap">
        {!isTrashed && (
          <>
            <button
              onClick={handleSave}
              disabled={!editorReady}
              className={`px-4 py-2 rounded-md text-white ${
                editorReady
                  ? "bg-blue-600 flex items-center gap-0.5 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <CloudUpload className="w-5 h-5 pt-0.5" />
              {editorReady ? "Save" : "Loading..."}
            </button>
            <button
              onClick={handleShare}
              disabled={!selectedNote?.noteId}
              className="px-4 py-2 flex items-center gap-0.5 rounded-md bg-green-600 hover:bg-green-700"
            >
              <Share2 className="w-5 h-5 pt-0.5" />
              Share
            </button>
          </>
        )}

        <DownloadButton title={title} editorInstance={ejInstance.current} />
      </div>

      <div
        id="editorjs"
        className="flex-1 min-h-[300px] max-h-[calc(100vh-300px)] overflow-y-auto px-3 py-2 rounded bg-zinc-900"
      />
    </div>
  );
};
