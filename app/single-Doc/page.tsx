"use client";

import { Doc } from "@/components/AllDocs";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Page() {
  const [singleDoc, setSingleDoc] = useState<Doc | null | any>(undefined);
  const searchParams = useSearchParams();
  const docId = searchParams.get("id");

  const router = useRouter();

  const handleDelete = async (doc: Doc) => {
    const res = await fetch("/api/" + doc.id, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/");
    }
  };

  useEffect(() => {
    const getSingleDoc = async () => {
      const result = await fetch("api/" + docId);
      const document = await result.json();
      setSingleDoc(document[0]);
    };
    getSingleDoc();
  }, [docId]);
  console.log(singleDoc);

  let formattedDate = "";
  if (singleDoc) {
    const date = singleDoc.createdAt;
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    formattedDate = new Intl.DateTimeFormat("sv-SE", options).format(newDate);
  }

  return (
    <div className="">
      <div className=" bg-orange-200 max-w-md p-3">
        <h1 className="mb-4 text-center font-bold text-gray-900 dark:text-white md:text-2xl lg:text-3xl xl:text-4xl">
          {singleDoc?.title}
        </h1>
        <p dangerouslySetInnerHTML={{ __html: singleDoc?.text }} />
        <p className="text-s text-gray-700 dark:text-gray-400">
          Skapad av: {singleDoc?.author} {"/ "}
          {formattedDate}
        </p>
      </div>
        <button className="mt-2 text-white bg-red-700 p-2 rounded-md hover:bg-red-800" onClick={(e) => handleDelete(singleDoc)}>Tabort</button>
    </div>
  );
}
