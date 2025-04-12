/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/coins/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x_cg_demo_api_key': `${process.env.NEXT_PUBLIC_API_HEADER_KEY}`
        },
      }
    );    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json( 
      { success: false, message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}