"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  // Fetch projects
  const fetchProjects = async () => {
    const res = await fetch("https://portfolio-backend-nx4a.onrender.com/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Delete project
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    await fetch(`https://portfolio-backend-nx4a.onrender.com/api/projects/${id}`, {
      method: "DELETE",
    });

    fetchProjects();
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl ">Projects List</h1>
        <Link
          href="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block"
        >
          ➕ Add Project
        </Link>
      </div>

      <div className="mt-6 w-full">
  <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-100 text-left">
        <th className="border border-gray-300 px-4 py-2 w-12 text-center">No</th>
        <th className="border border-gray-300 px-4 py-2 w-24 text-center">PNG</th>
        <th className="border border-gray-300 px-4 py-2">Title</th>
        <th className="border border-gray-300 px-4 py-2">Description</th>
        <th className="border border-gray-300 px-4 py-2 text-center w-40">Action</th>
      </tr>
    </thead>
    <tbody>
      {projects.map((project, index) => (
        <tr key={project._id} className="hover:bg-gray-50">
          {/* No */}
          <td className="border border-gray-300 px-4 py-2 text-center">
            {index + 1}
          </td>

          {/* Image */}
          <td className="border border-gray-300 px-4 py-2 text-center">
            <img
              src={`https://portfolio-backend-nx4a.onrender.com${project.image}`}
              alt={project.title}
              className="w-12 h-12 object-cover rounded-md mx-auto"
            />
          </td>

          {/* Title */}
          <td className="border border-gray-300 px-4 py-2 font-semibold">
            {project.title}
          </td>

          {/* Description */}
          <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
            {project.description}
          </td>

          {/* Action */}
          <td className="border border-gray-300 px-4 py-2">
            <div className="flex justify-center gap-2">
              <Link
                href={`/edit/${project._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                ✏️ Edit
              </Link>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                🗑️ Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}
