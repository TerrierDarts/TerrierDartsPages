import type { APIRoute } from 'astro';
import {version} from "../../public/obs_links/currencyTriggers/currencyTriggers.json";
export const get: APIRoute = async ({ params, request }) => {
return { 
    body: version.toString(),
    encoding: 'utf8',
    status: 200,
    headers: { "Content-Type": "text/plain" },
  };
}