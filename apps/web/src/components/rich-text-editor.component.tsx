"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import { styled } from "@mui/material";
import { red } from "@mui/material/colors";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

interface ITextEditorProps {
  value: string;
  error: string | undefined;
  setFieldValue: (val: string) => void;
}

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
    font-size: 14px;
    color: ${red[700]};
    padding-left: 10px;
  }
`;
export function RichTextEditor({
  error,
  value,
  setFieldValue,
}: ITextEditorProps) {
  const prepareDraft = (value: string) => {
    const draft = htmlToDraft(value);
    const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  const [editorState, setEditorState] = useState(
    value ? prepareDraft(value) : EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState: EditorState) => {
    const forFormik = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setFieldValue(forFormik);
    setEditorState(editorState);
  };

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
