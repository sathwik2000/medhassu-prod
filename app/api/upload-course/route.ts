// This endpoint is deprecated - only GitHub-driven content is supported
export async function POST(req: Request) {
  return Response.json(
    {
      error:
        "Upload via API is disabled. Please commit markdown files to your GitHub repository in the 'courses/' folder.",
    },
    { status: 410 },
  )
}
