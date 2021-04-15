import React, { useState, useEffect } from "react";
import axios from "axios";

import "./SnippetEditor.scss";

function SnippetEditor(props) {
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorCode, setEditorCode] = useState("");

  useEffect(() => {
    if (props.editSnippetData) {
      setEditorTitle(
        props.editSnippetData.title ? props.editSnippetData.title : undefined
      );
      setEditorDescription(
        props.editSnippetData.description
          ? props.editSnippetData.description
          : undefined
      );
      setEditorCode(
        props.editSnippetData.code ? props.editSnippetData.code : undefined
      );
    }
  }, [props.editSnippetData]);

  function closeEditor() {
    props.setEditorOpen(false);
    setEditorTitle("");
    setEditorDescription("");
    setEditorCode("");
    props.clearEditSnippetData();
  }

  async function saveSnippet(e) {
    e.preventDefault();
    const snippetData = {
      title: editorTitle ? editorTitle : "",
      description: editorDescription ? editorDescription : "",
      code: editorCode ? editorCode : "",
    };

    if (!props.editSnippetData)
      await axios.post("http://localhost:5005/snippets/", snippetData);
    else
      await axios.put(
        `http://localhost:5005/snippets/${props.editSnippetData._id}`,
        snippetData
      );

    props.getSnippets();
    closeEditor();
  }

  return (
    <div className="snippet-editor">
      <form className="form" onSubmit={saveSnippet}>
        <label htmlFor="editor-title">Title</label>
        <input
          id="editor-title"
          value={editorTitle}
          type="text"
          onChange={(e) => setEditorTitle(e.target.value)}
        />
        <label htmlFor="editor-description">Description</label>
        <input
          id="editor-description"
          value={editorDescription}
          type="text"
          onChange={(e) => setEditorDescription(e.target.value)}
        />
        <label htmlFor="editor-code">Code</label>
        <textarea
          value={editorCode}
          id="editor-code"
          onChange={(e) => setEditorCode(e.target.value)}
        />
        <div className="btn-container">
          <button type="submit" className="btn-submit">
            Submit
          </button>
          <button type="button" className="btn-edit" onClick={closeEditor}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SnippetEditor;
