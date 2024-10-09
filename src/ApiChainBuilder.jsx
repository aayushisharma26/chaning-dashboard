

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Modal from './Modal.jsx'; 


const ApiChainBuilder = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [postData, setPostData] = useState({ title: '', body: '' });
  const [posts, setPosts] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (selectedUser) {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.id}`);
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    };

    fetchPosts();
  }, [selectedUser]);

  const handleCreatePost = async () => {
    if (!selectedUser) {
      alert('Please select a user before creating a post.');
      return;
    }

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: postData.title,
        body: postData.body,
        userId: selectedUser.id,
      });
      setPosts(prevPosts => [...prevPosts, response.data]);
      setPostData({ title: '', body: '' }); 
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleViewComments = async (postId) => {
    setLoadingComments(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      setComments(response.data);
      setIsModalOpen(true); 
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  return (
    <div className="container mx-auto p-5 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">API Chain Dashboard</h1>

      <div className={`grid grid-cols-1 ${selectedUser ? 'md:grid-cols-2' : ''} gap-5 justify-center`}>
        <UserSelection users={users} setSelectedUser={setSelectedUser} />
        {selectedUser && <CreatePost postData={postData} setPostData={setPostData} handleCreatePost={handleCreatePost} />}
      </div>

      {selectedUser && posts.length > 0 && (
        <PostsSection posts={posts} loadingComments={loadingComments} handleViewComments={handleViewComments} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} comments={comments} />
    </div>
  );
};

const UserSelection = ({ users, setSelectedUser }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Select a User</h2>
    <select
      className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => setSelectedUser(users.find(user => user.id === parseInt(e.target.value)))}
    >
      <option value="">Select a User</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name} ({user.email})
        </option>
      ))}
    </select>
  </div>
);

const CreatePost = ({ postData, setPostData, handleCreatePost }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Create Post</h2>
    <input
      type="text"
      placeholder="Post Title"
      className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={postData.title}
      onChange={(e) => setPostData({ ...postData, title: e.target.value })}
    />
    <textarea
      placeholder="Post Body"
      className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
      value={postData.body}
      onChange={(e) => setPostData({ ...postData, body: e.target.value })}
    />
    <button
      onClick={handleCreatePost}
      className="w-full p-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
    >
      Create Post
    </button>
  </div>
);


const PostsSection = ({ posts, loadingComments, handleViewComments }) => (
  <div className="mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">User Posts</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map(post => (
        <div
          key={post.id}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-300 flex flex-col justify-between h-60"
        >
          <div>
            <p className="text-sm"><strong>Title:</strong> <span className="ml-2">{post.title}</span></p>
            <p className="text-sm mt-2"><strong>Body:</strong> <span className="ml-2">{post.body}</span></p>
          </div>
          <div className="mt-auto">
            <button
              onClick={() => handleViewComments(post.id)}
              className="w-full py-2 px-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {loadingComments ? 'Loading Comments...' : 'View Comments'}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);


export default ApiChainBuilder;
