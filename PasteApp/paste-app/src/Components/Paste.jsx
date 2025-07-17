import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Deleted successfully");
  }

  function handleShare(paste) {
    const shareData = {
      title: paste.title,
      text: paste.content,
      url: window.location.href + "#" + paste._id,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => toast.success("Shared successfully"))
        .catch(() => toast.error("Sharing failed"));
    } else {
      navigator.clipboard.writeText(`${paste.title}\n${paste.content}`);
      toast.success("Content copied for sharing (fallback)");
    }
  }

  return (
    <div className="container">
      <input
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredData.length > 0 ? (
        filteredData.map((paste) => (
          <div key={paste._id} className="paste-card">
            <h3>{paste.title}</h3>
            <p>{paste.content}</p>
            <div>
              <a href={`/?pasteId=${paste._id}`}>
                <button>Edit</button>
              </a>
              <a href={`/pastes/${paste._id}`}>
                <button>View</button>
              </a>
              <button onClick={() => handleDelete(paste._id)}>Delete</button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Copied to clipboard");
                }}
              >
                Copy
              </button>
              <button onClick={() => handleShare(paste)}>Share</button>
            </div>
            <small>{paste.createdAt}</small>
          </div>
        ))
      ) : (
        <p>No pastes found</p>
      )}
    </div>
  );
};

export default Paste;
