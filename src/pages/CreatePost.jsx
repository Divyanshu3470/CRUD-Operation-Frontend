import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function CreatePost() {
    const [post, setPost] = useState({
        title: "",
        author: "",
        category: "",
        content: "",
        image: null,
    });

    const [loading, setLoading] = useState(false);

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

        if (loading) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("author", post.author);
        formData.append("category", post.category);
        formData.append("content", post.content);

        if (post.image) {
            formData.append("image", post.image);
        }

        try {
            const res = await fetch(
                "https://crud-operation-backend-gvhj.onrender.com/posts",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) {
                throw new Error("Failed to create post");
            }

            const data = await res.json();
            console.log(data);

            alert("Post Created Successfully!");

            setPost({
                title: "",
                author: "",
                category: "",
                content: "",
                image: null,
            });

            // Reset file input
            const fileInput = document.getElementById("imageInput");
            if (fileInput) fileInput.value = "";

        } catch (err) {
            console.error(err);
            alert("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex justify-center items-center px-4 py-10">
            <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-slate-700 rounded-3xl p-8">

                <div className="flex justify-between items-center mb-8">
                    <Link
                        to="/"
                        className="text-white flex items-center gap-2 hover:text-blue-400"
                    >
                        <FaArrowLeft />
                        Back
                    </Link>

                    <h1 className="text-white text-4xl font-bold">
                        Create Post
                    </h1>

                    <div></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={post.title}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full bg-slate-800 text-white p-3 rounded-xl disabled:opacity-60"
                    />

                    <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={post.author}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full bg-slate-800 text-white p-3 rounded-xl disabled:opacity-60"
                    />

                    <select
                        name="category"
                        value={post.category}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full bg-slate-800 text-white p-3 rounded-xl disabled:opacity-60"
                    >
                        <option value="">Select Category</option>
                        <option>Technology</option>
                        <option>Sports</option>
                        <option>Travel</option>
                        <option>Education</option>
                        <option>Entertainment</option>
                    </select>

                    <textarea
                        rows={6}
                        name="content"
                        placeholder="Content"
                        value={post.content}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full bg-slate-800 text-white p-3 rounded-xl disabled:opacity-60"
                    />

                    <div className="flex flex-col gap-3">
                        <label className="text-white font-medium">
                            Upload Image
                        </label>

                        <label className="flex items-center justify-between bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-500 transition">
                            <span className="text-gray-300 truncate">
                                {post.image
                                    ? post.image.name
                                    : "No file selected"}
                            </span>

                            <input
                                id="imageInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                                disabled={loading}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {post.image && (
                        <img
                            src={URL.createObjectURL(post.image)}
                            alt="Preview"
                            className="h-60 w-full object-cover rounded-xl"
                        />
                    )}

                    {loading && (
                        <p className="text-center text-gray-300">
                            Publishing your post...
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center transition-all duration-300 ${
                            loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>

                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                                        5.291A7.962 7.962 0 014 12H0c0 
                                        3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>

                                Publishing...
                            </>
                        ) : (
                            "Publish Post"
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default CreatePost;
