import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import Welcome from "./Welcome";

import "./Home.scss";
import UserContext from "../context/UserContext";

function Home() {
  const domain = process.env.REACT_APP_BACKEND_DOMAIN;
  const [snippets, setSnippets] = useState([]);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      setSnippets([]);
    } else {
      getSnippets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function getSnippets() {
    const snippetsRes = await axios.get(`${domain}/snippets/`);
    setSnippets(snippetsRes.data.snippets);
  }

  function editSnippet(snippetData) {
    setEditSnippetData(snippetData);
    setEditorOpen(true);
  }

  function clearEditSnippetData() {
    setEditSnippetData("");
  }
  function renderSnippets() {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return sortedSnippets.map((snippet, i) => {
      return (
        <Snippet
          key={i}
          snippet={snippet}
          getSnippets={getSnippets}
          editSnippet={editSnippet}
        />
      );
    });
  }

  return (
    <div className="home">
      {!editorOpen && user && (
        <button
          onClick={() => setEditorOpen(true)}
          className="btn-editor-toggle"
        >
          Add snippet
        </button>
      )}
      {editorOpen && (
        <SnippetEditor
          setEditorOpen={setEditorOpen}
          getSnippets={getSnippets}
          editSnippetData={editSnippetData}
          clearEditSnippetData={clearEditSnippetData}
        />
      )}
      {snippets.length < 1 && user ? (
        <p className="no-snippet">No snippets to display</p>
      ) : (
        renderSnippets()
      )}
      {!user && <Welcome />}
    </div>
  );
}

export default Home;
