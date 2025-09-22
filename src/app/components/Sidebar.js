"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Dashboard", path: "/" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`p-2 rounded-md hover:bg-gray-700 ${
              pathname === item.path ? "bg-gray-700" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto bg-red-600 px-3 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
