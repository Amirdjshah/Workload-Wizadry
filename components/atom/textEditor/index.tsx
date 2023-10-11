"use-client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [wordCount, setWordCount] = useState(0);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleBackspace = (e: any) => {
    // Check if the backspace key is pressed and the content is empty or only contains <p><br></p>
    if (e.keyCode === 8 && value === "<p><br></p>") {
      e.preventDefault(); // Prevent default behavior
      onChange(""); // Set content to be empty string
    }
  };

  const handleChange = (content: any, delta: any, source: any, editor: any) => {
    const strippedContent = stripHtmlTags(content);
    setWordCount(strippedContent.length);
    onChange(content);
  };

  const stripHtmlTags = (html: any) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <>
      <ReactQuill
        value={value}
        onChange={handleChange}
        onKeyDown={handleBackspace}
        modules={modules}
        placeholder={placeholder}
      />
      <div
        style={{
          marginTop: "-25px",
          marginLeft: "10px",
          color: wordCount > 10 ? "red" : "gray",
          fontSize: "14px",
        }}
      >
        Count: {wordCount}/5000
      </div>
    </>
  );
};

export default QuillEditor;
