import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";

function ViewPosts() {
  const [posts, setPosts] = useState([]);

  // Fetch Posts
  const getPosts = async () => {
    try {
      const res = await fetch("https://crud-operation-backend-gvhj.onrender.com/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Delete Post
  const deletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`https://crud-operation-backend-gvhj.onrender.com/posts/${id}`, {
        method: "DELETE",
      });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-blue-400" ><FaArrowLeft />Back</Link>
          <h1 className="text-4xl font-bold text-white">All Posts</h1>
          <Link to="/create" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-white font-semibold" >+ New Post</Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-gray-400 text-xl mt-20">No Posts Found</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post._id} className="bg-white/10 backdrop-blur-xl border border-slate-700 rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition" >
                <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">{post.category}</span>
                  <h2 className="text-white text-2xl font-bold mt-4">{post.title}</h2>
                  <p className="text-gray-300 mt-2">By {post.author}</p>
                  <p className="text-gray-400 mt-4 line-clamp-4">{post.content}</p>
                  <div className="flex gap-3 mt-8">
                    <Link
                  to={`/edit/${post._id}`}className="flex-1 flex justify-center items-center gap-2 bg-yellow-500 hover:bg-yellow-600 py-3 rounded-xl text-white font-semibold"><FaEdit />Edit</Link>
                    <button onClick={() => deletePost(post._id)} className="flex-1 flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-xl text-white font-semibold cursor-pointer" ><FaTrash />Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewPosts;