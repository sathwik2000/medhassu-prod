import { getCourses } from "@/lib/markdown"

export async function GET() {
  const courses = await getCourses()
  return Response.json(courses)
}
