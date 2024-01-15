import { APIRoute } from 'astro';
import { builds } from '../../../public/obs_links/currencyTriggers/build_versions.json';

export function get({ params, request }) {

  const game = params;
  const buildValue = game.build;
  console.log('Build Value:', buildValue);
  if (buildValue) {
    const requestedValue = builds[buildValue];

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

export function getStaticPaths() {
  return [
    { params: { build: 'slots' } },
    { params: { build: 'gamble' } },
    { params: { build: 'raffles' } },
    { params: { build: 'casino' } },
    { params: { build: 'lotto' } }

  ];
}