import { NextResponse } from "next/server";
import { projectsData } from "@/data/projectsData";

export async function GET() {
  return NextResponse.json({
    success: true,
    count: projectsData.length,
    data: projectsData,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProject = {
      id: `proj-${Date.now()}`,
      stars: 1,
      membersCount: 1,
      maxMembers: 5,
      status: "Recruiting",
      ...body,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Project published successfully",
        data: newProject,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid project payload" },
      { status: 400 }
    );
  }
}
