import React from 'react';

const Modal = ({ isOpen, onClose, comments }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full h-auto overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">Comments</h2>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times; 
        </button>
        <div className="max-h-48 overflow-y-auto">
          {comments.length === 0 ? (
            <p className="text-center text-gray-700">No comments available.</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="border-b border-gray-200 py-1">
                <p className="font-semibold">{comment.name}</p>
                <p className="text-gray-600 text-sm">{comment.body}</p>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 text-center">
          <button 
            onClick={onClose} 
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
