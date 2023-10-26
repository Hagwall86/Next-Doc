import { dbQuery } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET (req: Request, res: Response) {
  const results = await dbQuery({
    query: "SELECT * FROM documents WHERE deleted=0"
  })
  return NextResponse.json(results, {status: 200})
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const {title, text, author} = body;

  const results = await dbQuery({
    query: "INSERT INTO documents (title, text, author) VALUES (?, ?, ?)",
    values: [title, text, author]

  });

  return NextResponse.json(results, {status: 200});
}
