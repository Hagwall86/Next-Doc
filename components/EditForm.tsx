"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface FormData {
  title: string;
  text: string;
  author: string;
}

const EditForm: React.FC = () => {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<FormData>({
    title: "",
    text: "",
    author: "",
  });

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
      text: text
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setFormData({ title: "", text: "", author: "" });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
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
            value={formData.title}
            onChange={handleChange}
            className="text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <Editor
          id="editor"
          apiKey={process.env.NEXT_PUBLIC_TINY_API}
          init={{
            plugins:
              "mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
          value={formData.text}
          onEditorChange={handleEditorChange}
        />
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
            value={formData.author}
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
    </div>
  );
};

export default EditForm;
