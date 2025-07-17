import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPastes = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return <div>Paste not found</div>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
        />
      </div>

      <div>
        <textarea
          value={paste.content}
          placeholder="Enter content here"
          disabled
          rows={10}
          cols={50}
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPastes;
