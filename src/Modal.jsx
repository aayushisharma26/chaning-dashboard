import React from 'react';

const Modal = ({ isOpen, onClose, comments }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 w-11/12 max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="p-4 bg-gray-100 border border-gray-200 rounded-lg mb-2">
              <p>{comment.body}</p>
              <p className="text-sm text-gray-600">— {comment.email}</p>
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
        <button onClick={onClose} className="mt-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
