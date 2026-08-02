import React from "react";
import { Link } from "react-router-dom";
import { GrAddCircle } from "react-icons/gr";
import { CgNotes } from "react-icons/cg";

function Options() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl rounded-3xl bg-white/10 backdrop-blur-2xl border border-slate-600 shadow-2xl shadow-white/20 p-6 sm:p-8 md:p-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Choose a Task</h1>
          <p className="text-sm sm:text-base text-gray-300">Select an option below to continue.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white flex flex-col hover:scale-105 transition duration-300">
            <GrAddCircle className="text-5xl sm:text-6xl" />
            <h2 className="text-2xl sm:text-3xl font-bold mt-5">Create Post</h2>
            <p className="mt-3 text-sm sm:text-base text-blue-100 grow">Publish a new post and share your ideas with everyone.</p>
            <Link to="/create" className="mt-8 bg-white text-blue-600 py-3 rounded-full text-center font-semibold hover:bg-gray-100 transition" >Get Started →</Link>
          </div>

          <div className="bg-linear-to-br from-pink-500 to-purple-600 rounded-3xl p-6 text-white flex flex-col hover:scale-105 transition duration-300">
            <CgNotes className="text-5xl sm:text-6xl" />
            <h2 className="text-2xl sm:text-3xl font-bold mt-5">View Posts</h2>
            <p className="mt-3 text-sm sm:text-base text-pink-100 grow">Browse, edit and manage all your existing posts.</p>
            <Link to="/posts" className="mt-8 bg-white text-pink-600 py-3 rounded-full text-center font-semibold hover:bg-gray-100 transition">Explore →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;