import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Make server-side fetch to the external API
    const response = await fetch(
      `https://trend-story-api.oopus.info/article/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    // Get the response data
    const data = await response.json();

    // If the API returns 404, return the exact error format
    if (response.status === 404) {
      return NextResponse.json(
        { code: 404, error: 'Article not found' },
        { status: 404 }
      );
    }

    // If the response is not ok but not 404, return error
    if (!response.ok) {
      return NextResponse.json(
        { code: response.status, error: data.error || 'An error occurred' },
        { status: response.status }
      );
    }

    // Return successful response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy API error:', error);
    return NextResponse.json(
      { code: 500, error: 'Internal server error' },
      { status: 500 }
    );
  }
}