"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface Doc {
  id: number;
  title: string;
  text: string;
  author: string;
  createdAt: Date;
  deleted: boolean;
}

export default function AllDocs() {
  const [docs, setDocs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getDocs = async () => {
      const res = await fetch("/api");
      const docs = await res.json();
      setDocs(docs);
    };
    getDocs();
  }, []);

  const handleEdit = (doc: Doc) => {
    router.push(`/edit-Doc/?id=${doc.id}`);
  };

  const handleSingleDoc = (doc: Doc) => {
    router.push(`/single-Doc/?id=${doc.id}`);
  };

  const handleDelete = async (doc: Doc) => {
    const res = await fetch("/api/" + doc.id, {
      method: "DELETE",
    });

    if (res.ok) {
      setDocs(docs.filter((keep: Doc) => keep.id !== doc.id));
    }
  };

  return (
    <div className="flex mt-3">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-4">Välkommen till NextDoc din dokumenthanterare på nätet</h1>
        <div className="flex">
        <h2 className="text-2xl text-white font-bold">Alla dokument</h2>
        </div>
        <ul className="font-bold text-2xl flex gap-2 flex-col">
          {docs.map((doc: Doc) => (
            <li
              className="border rounded-md border-black bg-cyan-100 p-4 mb-4"
              key={doc.id}
            >
              <h4
                className="cursor-pointer"
                onClick={() => handleSingleDoc(doc)}
              >
                {doc.title} av {doc.author}
              </h4>
              <div className="mt-4">
                <button
                  className="text-white bg-green-500 p-2 rounded-md mr-2 hover:bg-green-600"
                  onClick={() => handleEdit(doc)}
                >
                  Redigera
                </button>
                <button
                  className="text-white bg-red-700 p-2 rounded-md hover:bg-red-800"
                  onClick={() => handleDelete(doc)}
                >
                  Ta bort
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
