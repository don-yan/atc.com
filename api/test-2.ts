/**
 * Test Vercel Edge Function
 */

export const config = {
    runtime: 'edge',
};


export function GET(request: Request) {

    let timestamp = Math.ceil(new Date().getTime() / 1000);
    return new Response(`Hello from ${process.env.VERCEL_REGION} | [${process.env.MAILCHIMP_SERVER_PREFIX}] [${timestamp}]`);
}
