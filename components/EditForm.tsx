"use client";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  title: string;
  text: string;
  author: string;
}

const EditForm: React.FC = () => {
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
      <h1 className="text-black text-2xl font-semibold mb-4">Nytt document</h1>
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
