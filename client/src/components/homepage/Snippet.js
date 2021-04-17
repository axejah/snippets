import React from "react";
import axios from "axios";
import "./Snippet.scss";

function Snippet({ snippet, getSnippets, editSnippet }) {
  async function deleteSnippet() {
    if (window.confirm("Do you want to remove this snippet?")) {
      await axios.delete(`/api/snippets/${snippet._id}`);

      getSnippets();
    }
  }

  return (
    <div className="snippet">
      {snippet.title && <h2>{snippet.title}</h2>}
      {snippet.description && <p>{snippet.description}</p>}
      {snippet.code && (
        <pre>
          <code>{snippet.code}</code>
        </pre>
      )}
      <button className="btn-edit" onClick={() => editSnippet(snippet)}>
        Edit
      </button>
      <button className="btn-delete" onClick={deleteSnippet}>
        Delete
      </button>
    </div>
  );
}

export default Snippet;
