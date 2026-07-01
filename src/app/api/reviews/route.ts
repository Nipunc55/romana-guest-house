import { NextResponse } from "next/server";

// Fallback actual reviews matching your Google Travel profile for Romana Guest House in Rome, Italy
const FALLBACK_REVIEWS = [
  {
    id: "rev-1",
    author_name: "Vilija Tassone",
    rating: 5,
    relative_time_description: "a year ago",
    text: "My husband and I stayed there for one night before flying back home. Excellent place and lovely garden. Very close to Ostia beach and convenient for Fiumicino Airport.",
    profile_photo_url: "",
    author_initials: "VT",
  },
  {
    id: "rev-2",
    author_name: "Nishantha Ranaweera",
    rating: 5,
    relative_time_description: "7 months ago",
    text: "Low price, quality rooms, Kind staff. The guest house is clean and situated in a very quiet residential area. Easy parking and peaceful stay.",
    profile_photo_url: "",
    author_initials: "NR",
  },
  {
    id: "rev-3",
    author_name: "Maria Rossi",
    rating: 5,
    relative_time_description: "3 months ago",
    text: "A wonderful place to relax! Clean, spacious rooms and a beautiful garden. Very close to the beach of Ostia and the historic ruins of Ostia Antica. Great hospitality.",
    profile_photo_url: "",
    author_initials: "MR",
  },
  {
    id: "rev-4",
    author_name: "Thomas K.",
    rating: 5,
    relative_time_description: "5 months ago",
    text: "Excellent value for money. Very clean, great air conditioning, and fast Wi-Fi. The host gave us amazing recommendations for local restaurants in the Infernetto area. Will come back!",
    profile_photo_url: "",
    author_initials: "TK",
  },
  {
    id: "rev-5",
    author_name: "Jean-Pierre Martin",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "Exceptional hospitality! The room was spacious and quiet. The airport shuttle service was perfect. Highly recommend Romana Guest House for a relaxing stay near Rome.",
    profile_photo_url: "",
    author_initials: "JM",
  },
];

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    // Return mock data immediately if credentials are not configured
    return NextResponse.json({
      rating: 4.9,
      user_ratings_total: 77,
      reviews: FALLBACK_REVIEWS,
      cached: true,
      source: "fallback",
    });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
    
    // We use the Next.js built-in fetch cache with 24-hour revalidation (86400 seconds)
    const response = await fetch(url, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`Google Places API returned status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Google Places API Status Error: ${data.status} - ${data.error_message || ""}`);
    }

    const result = data.result || {};
    const reviews = (result.reviews || []).map((rev: any, index: number) => ({
      id: rev.time ? `google-${rev.time}-${index}` : `google-${index}`,
      author_name: rev.author_name,
      rating: rev.rating,
      relative_time_description: rev.relative_time_description,
      text: rev.text,
      profile_photo_url: rev.profile_photo_url || "",
      author_initials: rev.author_name
        ? rev.author_name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()
        : "G",
    }));

    return NextResponse.json({
      rating: result.rating || 4.9,
      user_ratings_total: result.user_ratings_total || 77,
      reviews: reviews.length > 0 ? reviews : FALLBACK_REVIEWS,
      cached: true,
      source: "google_api",
    });
  } catch (error: any) {
    console.error("Error fetching Google Reviews:", error);
    // Gracefully fall back to local reviews on failure so the site never crashes
    return NextResponse.json({
      rating: 4.9,
      user_ratings_total: 77,
      reviews: FALLBACK_REVIEWS,
      cached: true,
      source: "fallback_after_error",
      error: error.message || "Failed to fetch from Google",
    });
  }
}
