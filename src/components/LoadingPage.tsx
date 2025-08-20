import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <div className="text-lg font-semibold tracking-wide animate-pulse">
          Loading your workspace...
        </div>
        <div className="text-sm text-gray-400">
          Please wait while we fetch your notes.
        </div>
      </div>
    </div>
  );
};
