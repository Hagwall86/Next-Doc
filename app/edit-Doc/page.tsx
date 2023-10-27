"use client";

import Link from "next/link";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Doc } from "@/components/AllDocs";

interface FormData {
  title: string;
  text: string;
  author: string;
}

export default function EditDoc() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    text: "",
    author: "",
  });
  const [fullDoc, setFullDoc] = useState<Doc | undefined>(undefined);

  const router = useRouter();

  const searchParams = useSearchParams();
  const docId = searchParams.get("id");

  useEffect(() => {
    const getDoc = async () => {
      const res = await fetch("api/" + docId);
      const data = await res.json();
      setFullDoc(data[0]);
      setFormData({
        title: data[0].title,
        text: data[0].text,
        author: data[0].author,
      });
    };
    if (docId) getDoc();
  }, [docId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditorChange = (text: string, editor: any) => {
    setFormData((prevData) => ({
      ...prevData,
      text: text,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/" + docId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/");
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-200 rounded-md shadow-md">
      <h1 className="mb-4 text-3xl">Redigera Dokumentet</h1>
      {fullDoc ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Rubrik
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={fullDoc.title}
              onChange={handleChange}
              className="text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex min-h-3xl">
            <Editor
            id="editor"
            apiKey={process.env.NEXT_PUBLIC_TINY_API}
            init={{
              plugins:
                "mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
            initialValue={fullDoc.text}
            onEditorChange={handleEditorChange}
          />
          </div>

          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-600"
            >
              Skapad av
            </label>
            <input
              type="text"
              id="author"
              name="author"
              defaultValue={fullDoc.author}
              onChange={handleChange}
              className="text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-black rounded-md hover:bg-green-600 focus:outline-none focus:ring"
            >
              Spara
            </button>
            <Link
              href="/"
              type="button"
              className="ml-2 px-4 py-2 bg-red-600 text-black rounded-md hover:bg-red-700 focus:outline-none focus:ring"
            >
              Avbryt
            </Link>
          </div>
        </form>
      ) : (
        <h1>Hämtar dokumentet från databasen...</h1>
      )}
    </div>
  );
}
