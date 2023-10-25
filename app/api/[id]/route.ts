import { dbQuery } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET (req: Request, {params}: {params: {id: string}}) {
  const {id} = params;
  console.log("id", id);

  const results = await dbQuery({
    query: "SELECT * FROM documents where id =" + parseInt(id)
  })
  return NextResponse.json(results, {status: 200})
}

export async function PATCH(req: Request, {params}: {params: {id: string}}) {
  const {id} = params;
  const body = await req.json();
  const {title, text, author} = body

  const result = await dbQuery({
    query: "UPDATE documents SET title = ?, text = ?, author = ? WHERE id = ?" + parseInt(id),
    values: [title, text, author]
  })
  return NextResponse.json(result, {status: 200})
}