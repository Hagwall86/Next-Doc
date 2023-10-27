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
  const [deleteDoc, setDeleteDoc] = useState<Doc | null>(null);
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

  const openDeleteModal = (doc: Doc) => {
    setDeleteDoc(doc);
  };

  const closeDeleteModal = () => {
    setDeleteDoc(null);
  };

  const confirmDelete = async () => {
    if (deleteDoc) {
      const res = await fetch("/api/" + deleteDoc.id, {
        method: "DELETE",
      });

      if (res.ok) {
        setDocs(docs.filter((keep: Doc) => keep.id !== deleteDoc.id));
      }
      setDeleteDoc(null);
    }
  };

  return (
    <div className="flex mt-3">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Välkommen till NextDoc din dokumenthanterare på nätet
        </h1>
        <div className="flex">
          <h2 className="text-2xl text-white font-bold">Alla dokument</h2>
        </div>
        <ul className="font-bold text-2xl flex gap-2 flex-col-reverse">
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
                  onClick={() => openDeleteModal(doc)}
                >
                  Ta bort
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {deleteDoc && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className=" bg-slate-400 p-8 rounded-md shadow-md relative z-10">
            <p className=" text-3xl">Vill du verkligen ta bort dokumentet?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={confirmDelete}
              >
                Ja, ta bort
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md ml-4"
                onClick={closeDeleteModal}
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
