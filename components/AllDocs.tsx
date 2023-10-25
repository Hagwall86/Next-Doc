"use client";

import { useState, useEffect } from "react";

interface Doc {
  id: number;
  title: string;
  text: string;
  author: string;
  createdAt: Date;
}

export default function AllDocs() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const getDocs = async () => {
      const res = await fetch("/api");
      const docs = await res.json();
      setDocs(docs);
    };
    getDocs();
  }, []);

  return (
    <div>
      <ul className="font-bold text-2xl">
        {docs.map((doc: Doc) => (
          <li key={doc.id}>
            {doc.title} - {doc.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
