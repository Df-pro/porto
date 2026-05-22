import { NextRequest, NextResponse } from 'next/server';

// Alchemy NFT API proxy route
// Proxies requests to avoid exposing the API key on the client
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const walletAddress = searchParams.get('address');

  if (!walletAddress) {
    return NextResponse.json(
      { error: 'Wallet address is required' },
      { status: 400 }
    );
  }

  const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

  if (!alchemyApiKey) {
    // Return mock data when Alchemy is not configured
    return NextResponse.json({
      ownedNfts: [],
      totalCount: 0,
      message: 'Alchemy API key not configured. Add NEXT_PUBLIC_ALCHEMY_API_KEY to .env.local',
    });
  }

  try {
    const response = await fetch(
      `https://polygon-mumbai.g.alchemy.com/nft/v3/${alchemyApiKey}/getNFTsForOwner?owner=${walletAddress}&withMetadata=true&pageSize=20`,
      {
        headers: { Accept: 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Alchemy API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('NFT fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NFTs' },
      { status: 500 }
    );
  }
}
