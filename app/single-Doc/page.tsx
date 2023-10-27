"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export interface Doc {
  id: number;
  title: string;
  text: string;
  author: string;
  createdAt: Date;
  deleted: boolean;
}

export default function Page() {
  const [singleDoc, setSingleDoc] = useState<Doc | null | any>(undefined);
  const searchParams = useSearchParams();
  const docId = searchParams.get("id");
  const router = useRouter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    if (singleDoc) {
      const res = await fetch("/api/" + singleDoc.id, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/");
      }
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
      <div className="bg-orange-200 max-w-md p-3">
        <h1 className="mb-4 mt-3 text-center font-bold text-gray-900 dark:text-white md:text-2xl lg:text-3xl xl:text-4xl">
          {singleDoc?.title}
        </h1>
        <p dangerouslySetInnerHTML={{ __html: singleDoc?.text }} />
        <p className="text-s text-gray-700 dark:text-gray-400 mt-5">
          Skapad av: {singleDoc?.author} {"/ "}
          {formattedDate}
        </p>
      </div>
      <button
        className="mt-2 mb-3 text-black bg-red-700 p-2 rounded-md hover:bg-red-800"
        onClick={openDeleteModal}
      >
        Ta bort
      </button>
      <Link
        href="/"
        type="button"
        className="ml-2 px-4 py-2 bg-orange-500 text-black rounded-md hover:bg-red-700 focus:outline-none focus:ring"
      >
        Tillbaka
      </Link>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="bg-slate-400 p-8 rounded-md shadow-md relative z-10">
            <p className="text-3xl">Vill du verkligen ta bort dokumentet?</p>
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
