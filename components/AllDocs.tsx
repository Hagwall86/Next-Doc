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

  const handelEdit = (doc: Doc) => {
    router.push(`/edit-Doc/?id=${doc.id}`);
  };

  const handelDelete = async (doc: Doc) => {
    const res = await fetch("/api/" + doc.id, {
      method: "DELETE",
    });

    if (res.ok) {
      setDocs(docs.filter((keep: Doc) => keep.id != doc.id));
    }
  };

  return (
    <div className="flex">
      <ul className="font-bold text-2xl">
        {docs.map((doc: Doc) => (
          <div className="flex justify-between border rounded-md border-blue-500 " key={doc.id}>
            <li>
              {doc.title} - {doc.author}{" "}
              <button
                className="bg-blue text-green-600"
                onClick={(e) => handelEdit(doc)}
              >
                Redigera
              </button>{" "}
              |-|{" "}
              <button
                className="bg-red text-white"
                onClick={(e) => handelDelete(doc)}
              >
                Ta bort
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
