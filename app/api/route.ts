export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const response = await fetch(
        "https://cataas.com/cat?json=true",
        { cache: "no-store" }
    );
    const { _id } = await response.json();

    // https://www.youtube.com/watch?v=zdV_fXjoB-Q
    await fetch(process.env.WEBHOOK_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: `https://cataas.com/cat/${_id}`
        })
    });

    return new Response(`${_id}`);
}