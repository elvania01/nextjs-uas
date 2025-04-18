"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

type Owner = {
  name: string;
  image: string;
  desc: string;
};

const OwnerProfilePage = () => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [owners, setOwners] = useState<Owner[]>([
    {
      name: "Vinsensius",
      image: "owner1.jpg",
      desc: "A flower enthusiast with a passion for transforming nature’s beauty into meaningful works of art...",
    },
    {
      name: "Elvania",
      image: "owner2.jpg",
      desc: "With experience and meticulous attention to every detail, Elvania is committed to creating floral arrangements...",
    },
    {
      name: "Aditya",
      image: "owner3.jpg",
      desc: "He creates designs that are not only beautiful but also convey emotions and stories in every moment...",
    },
  ]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newOwner, setNewOwner] = useState<Owner>({ name: "", image: "", desc: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const username = localStorage.getItem("username");

      if (!isLoggedIn || username !== "Owner") {
        router.push("/auth/login");
      } else {
        setIsChecking(false);
      }
    }
  }, [router]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewOwner((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOwners((prev) => {
          const updated = [...prev];
          updated[index].image = reader.result as string;
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOwner = () => {
    if (!newOwner.name || !newOwner.image || !newOwner.desc) {
      alert("Please fill in all fields");
      return;
    }
    setOwners((prev) => [...prev, newOwner]);
    setNewOwner({ name: "", image: "", desc: "" });
    setIsAdding(false);
  };

  const handleDeleteOwner = (index: number) => {
    setOwners((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveEdit = () => {
    setEditingIndex(null);
  };

  const filteredOwners = owners.filter((owner) =>
    owner.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isChecking) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-500 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-pacifico text-white text-3xl font-bold text-center mb-4">Florist Team</h1>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="font-pacifico px-4 py-2 rounded-full w-full sm:w-64 shadow-inner"
          />
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="font-pacifico bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-1"
          >
            <PlusIcon className="w-4 h-4" />
            {isAdding ? "Cancel Add" : "Add New Team"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredOwners.map((owner, i) => (
            <div
              key={i}
              className="relative bg-pink-100 rounded-xl shadow-xl p-6 flex flex-col items-center text-center"
            >
              {editingIndex === i ? (
                <>
                  <input
                    type="text"
                    value={owner.name}
                    onChange={(e) => {
                      const updated = [...owners];
                      updated[i].name = e.target.value;
                      setOwners(updated);
                    }}
                    className="text-center font-semibold text-lg mb-2 rounded bg-white px-2 py-1"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleEditImageUpload(e, i)}
                    className="mb-2 text-sm"
                  />
                  <textarea
                    value={owner.desc}
                    onChange={(e) => {
                      const updated = [...owners];
                      updated[i].desc = e.target.value;
                      setOwners(updated);
                    }}
                    className="text-center rounded bg-white px-2 py-1 text-sm mb-2"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="bg-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={owner.image || "/default-owner.jpg"}
                    alt={owner.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white mb-4"
                  />
                  <h2 className="font-pacifico text-2xl font-cursive text-pink-700 mb-2">{owner.name}</h2>
                  <p className="font-pacifico text-pink-600 text-sm italic mb-4">{owner.desc}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingIndex(i)}
                      className="text-pink-600 hover:text-pink-800"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteOwner(i)}
                      className="text-pink-600 hover:text-pink-800"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {isAdding && (
            <div className="relative bg-white border-4 border-dashed border-pink-300 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
              <input
                type="text"
                placeholder="Name"
                value={newOwner.name}
                onChange={(e) => setNewOwner((prev) => ({ ...prev, name: e.target.value }))}
                className="text-center font-semibold text-lg mb-2 rounded bg-white px-2 py-1 border"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-2 text-sm"
              />
              <textarea
                placeholder="Description"
                value={newOwner.desc}
                onChange={(e) => setNewOwner((prev) => ({ ...prev, desc: e.target.value }))}
                className="text-center rounded bg-white px-2 py-1 text-sm mb-2 border"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleAddOwner}
                  className="bg-green-500 text-white px-4 py-1 rounded-full text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerProfilePage;
