"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [video, setVideo] = useState("");
  const [category, setCategory] = useState("Web");
  const [imageFile, setImageFile] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("projectLink", link);
    formData.append("videoUrl", video);
    formData.append("category", category);
    if (imageFile) formData.append("image", imageFile);

    await fetch("https://portfolio-backend-nx4a.onrender.com/api/projects", {
      method: "POST",
      body: formData,
    });

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
          ➕ Add New Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <input
              type="text"
              placeholder="Enter project title"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter project description"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>

          {/* Project Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Link
            </label>
            <input
              type="text"
              placeholder="https://example.com"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video URL
            </label>
            <input
              type="text"
              placeholder="https://youtube.com/..."
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="block w-full text-sm text-gray-600 
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Web">Web</option>
              <option value="App">App</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium shadow"
            >
              💾 Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
