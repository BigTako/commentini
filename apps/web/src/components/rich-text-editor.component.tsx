"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import { styled } from "@mui/material";
import { red } from "@mui/material/colors";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const StyledEditor = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & {
    .toolbar-class {
      background-color: var(--color-primary-200);
    }

    .editor-class {
      background-color: var(--color-primary-100);
      padding: 0 10px;
      max-height: 300px;
      overflow-y: auto;
    }

    .rdw-option-wrapper,
    .rdw-dropdown-wrapper {
      background-color: var(--color-primary-200);
      border: none;
    }

    .rdw-option-wrapper:hover,
    .rdw-dropdown-wrapper:hover {
      background-color: var(--color-primary-300);
      border: none;
    }
  }
  .editor-error {
    color: ${red[700]};
    padding-left: 10px;
  }
`;
export function RichTextEditor({
  error,
  onChange,
}: {
  error?: string;
  onChange: (value: string) => void;
}) {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const onEditorStateChange = (newEditorState: EditorState): void => {
    setEditorState(newEditorState);
  };

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const htmlContent = draftToHtml(rawContentState);
    onChange(htmlContent);
  }, [editorState]);

  return (
    <StyledEditor>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <div className="editor-error">{error}</div>
    </StyledEditor>
  );
}
