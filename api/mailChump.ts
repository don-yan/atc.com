/**
 * Test Vercel Edge Function
 */

export const config = {
    runtime: 'edge',
};


export function GET(request: Request) {
    return new Response(`Mailchimp - Hello from ${process.env.VERCEL_REGION}`);
}
