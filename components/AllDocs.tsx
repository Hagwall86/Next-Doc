"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface Doc {
  id: number;
  title: string;
  text: string;
  author: string;
  createdAt: Date;
  deleted: boolean
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
  }

  return (
    <div>
      <ul className="font-bold text-2xl">
        {docs.map((doc: Doc) => (
          <li key={doc.id}>
            {doc.title} - {doc.author}{" "}
            <button className="bg-blue text-green-600" onClick={(e) => handelEdit(doc)}>Redigera</button> |-|{" "}
            <button>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
