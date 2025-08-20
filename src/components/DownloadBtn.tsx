import { useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  title: string;
  editorInstance: EditorJS | null;
}

export const DownloadButton = ({
  title,
  editorInstance,
}: DownloadButtonProps) => {
  const downloading = useRef(false);

  const handleDownload = async () => {
    if (!editorInstance || downloading.current) return;
    downloading.current = true;

    try {
      const savedData = await editorInstance.save();
      const blocks = savedData.blocks;

      const renderBlock = (block: any) => {
        switch (block.type) {
          case "header":
            return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;

          case "paragraph":
            return `<p>${block.data.text}</p>`;

          case "list":
            const tag = block.data.style === "ordered" ? "ol" : "ul";
            return `<${tag}>${block.data.items
              .map((item: string) => `<li>${item}</li>`)
              .join("")}</${tag}>`;

          case "checklist":
            return `
              <ul style="list-style: none; padding-left: 1rem;">
                ${block.data.items
                  .map((item: any) => {
                    const check = item.checked ? "☑️" : "⬜";
                    return `<li>${check} ${item.text}</li>`;
                  })
                  .join("")}
              </ul>
            `;

          case "quote":
            return `<blockquote style="border-left: 4px solid #ccc; padding-left: 1rem; font-style: italic;">${block.data.text}</blockquote>`;

          case "code":
            return `<pre><code>${block.data.code}</code></pre>`;

          case "marker":
            return `<mark>${block.data.text}</mark>`;

          default:
            return `<div style="color: red;">❌ Unsupported block: ${block.type}</div>`;
        }
      };

      const htmlContent = blocks.map(renderBlock).join("\n");

      const fullHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>${title || "Untitled"}</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              padding: 2rem;
              background: #fdfdfd;
              color: #222;
              line-height: 1.6;
            }
            h1, h2, h3, h4 {
              font-weight: 600;
              margin-top: 1.5rem;
              margin-bottom: 1rem;
            }
            p {
              margin: 0.5rem 0;
            }
            ol, ul {
              margin-left: 2rem;
              margin-bottom: 1rem;
            }
            pre {
              background: #1e1e1e;
              color: #f8f8f2;
              padding: 1rem;
              border-radius: 8px;
              overflow-x: auto;
            }
            blockquote {
              color: #666;
              border-left: 4px solid #ccc;
              padding-left: 1rem;
              margin: 1rem 0;
              font-style: italic;
              background-color: #f9f9f9;
            }
            mark {
              background-color: yellow;
              padding: 0.1rem 0.3rem;
              border-radius: 3px;
            }
          </style>
        </head>
        <body>
          <h1>${title || "Untitled Note"}</h1>
          ${htmlContent}
        </body>
        </html>
      `;

      const blob = new Blob([fullHTML], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${title || "untitled"}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Download failed:", error);
    } finally {
      downloading.current = false;
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!editorInstance}
      className="px-4 py-2 flex items-center gap-1 rounded-md bg-purple-600 hover:bg-purple-700"
    >
      <Download className="w-5 h-5" />
      Download
    </button>
  );
};
