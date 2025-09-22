"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProject() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [video, setVideo] = useState("");
  const [category, setCategory] = useState("Web");
const [image, setImage] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`https://portfolio-backend-nx4a.onrender.com/api/projects/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setDescription(data.description);
      setLink(data.projectLink || ""); // backend key name
      setVideo(data.videoUrl || "");
      setCategory(data.category || "Web");
      setImage(data.image || "");

    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`https://portfolio-backend-nx4a.onrender.com/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        projectLink: link,
        videoUrl: video,
          image,        // <-- added

        category,
      }),
    });

    router.push("/admin"); // back to admin dashboard
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Project Link"
          className="w-full border p-2 rounded"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <input
          type="text"
          placeholder="Video URL"
          className="w-full border p-2 rounded"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
        />
        <input
  type="text"
  placeholder="Image URL"
  className="w-full border p-2 rounded"
  value={image}
  onChange={(e) => setImage(e.target.value)}
/>


        {/* Category Dropdown */}
        <select
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Web">Web</option>
          <option value="App">App</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
