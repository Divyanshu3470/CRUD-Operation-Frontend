import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function CreatePost() {
    const [post, setPost] = useState({title: "", author: "", category: "", content: "", image: null});

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = (e) => {
        setPost({
            ...post,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", post.title);
        formData.append("author", post.author);
        formData.append("category", post.category);
        formData.append("content", post.content);
        formData.append("image", post.image);

        try {
            const res = await fetch("https://crud-operation-backend-gvhj.onrender.com/posts", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            alert("Post Created Successfully");

            setPost({title: "",author: "",category: "",content: "",image: null,});
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    return 
        <div className="min-h-screen bg-slate-900 flex justify-center items-center px-4 py-10">
            <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-slate-700 rounded-3xl p-8">
                <div className="flex justify-between items-center mb-8">
                    <Link to="/" className="text-white flex items-center gap-2 hover:text-blue-400" ><FaArrowLeft />Back</Link>
                    <h1 className="text-white text-4xl font-bold">Create Post</h1>
                    <div></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="text" name="title" placeholder="Title" value={post.title} onChange={handleChange} className="w-full bg-slate-800 text-white p-3 rounded-xl" />
                    <input type="text" name="author" placeholder="Author" value={post.author} onChange={handleChange} className="w-full bg-slate-800 text-white p-3 rounded-xl" />
                    <select name="category" value={post.category} onChange={handleChange} className="w-full bg-slate-800 text-white p-3 rounded-xl" >
                        <option value="">Select Category</option>
                        <option>Technology</option>
                        <option>Sports</option>
                        <option>Travel</option>
                        <option>Education</option>
                        <option>Entertainment</option>
                    </select>

                    <textarea rows={6} name="content" placeholder="Content" value={post.content} onChange={handleChange} className="w-full bg-slate-800 text-white p-3 rounded-xl" />

                    <div className="flex flex-col gap-3">
                        <label className="text-white font-medium">Upload Image</label>
                        <label className="flex items-center justify-between bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-500 transition">
                            <span className="text-gray-300 truncate">{post.image ? post.image.name : "No file selected"}</span>
                            <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                        </label>
                    </div>

                    {post.image && (
                        <img src={URL.createObjectURL(post.image)} alt="" className="h-60 w-full object-cover rounded-xl" />
                    )}

                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl" >Publish Post</button>

                </form>

            </div>
        </div>
    ;
}

export default CreatePost;