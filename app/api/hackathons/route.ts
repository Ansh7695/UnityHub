import { NextResponse } from "next/server";
import hackathonData from "@/data/hackathonsData";

export async function GET() {
  return NextResponse.json({
    success: true,
    count: hackathonData.length,
    data: hackathonData,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newHackathon = {
      id: Date.now(),
      ...body,
      date: body.date || "Upcoming 2026",
    };

    return NextResponse.json(
      {
        success: true,
        message: "Hackathon created successfully",
        data: newHackathon,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to parse request payload" },
      { status: 400 }
    );
  }
}
