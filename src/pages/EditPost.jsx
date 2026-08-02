import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({title: "",author: "",category: "",content: "",});

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const res = await fetch(`http://localhost:5000/posts/${id}`);
            const data = await res.json();
            setPost(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            });
            alert("Post Updated Successfully");

            navigate("/posts");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex justify-center items-center px-4">
            <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-3xl p-8">
                <div className="flex justify-between items-center mb-8">
                    <Link to="/posts" className="text-white flex gap-2 items-center" ><FaArrowLeft />Back</Link>
                    <h1 className="text-white text-3xl font-bold">Edit Post</h1>
                    <div></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="text" name="title" value={post.title} onChange={handleChange} placeholder="Title" className="w-full bg-slate-800 p-3 rounded-xl text-white" />
                    <input type="text" name="author" value={post.author} onChange={handleChange} placeholder="Author" className="w-full bg-slate-800 p-3 rounded-xl text-white" />
                    <select name="category" value={post.category} onChange={handleChange} className="w-full bg-slate-800 p-3 rounded-xl text-white" >
                        <option>Technology</option>
                        <option>Sports</option>
                        <option>Travel</option>
                        <option>Education</option>
                        <option>Entertainment</option>
                    </select>
                    <textarea rows="6" name="content" value={post.content} onChange={handleChange} className="w-full bg-slate-800 p-3 rounded-xl text-white" />
                    <button className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl text-white font-bold" >Update Post</button>
                </form>
            </div>
        </div>
    );
}

export default EditPost;