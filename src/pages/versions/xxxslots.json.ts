/*/ src/routes/versions/api/builds.ts
import { APIRoute } from 'astro';
import { builds } from '../../../public/obs_links/currencyTriggers/build_versions.json';

export function get({ params, request }) {
  //const { params } = context;
  const { game } = params;

  console.log('Game:', pathname);

  if (game) {
    const requestedValue = builds[game];

    if (requestedValue !== undefined) {
      return {
        body: requestedValue.toString(),
        encoding: 'utf8',
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      };
    }
  }

  console.log('Not Found');
  return {
    status: 404,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Not Found',
  };
};
*/