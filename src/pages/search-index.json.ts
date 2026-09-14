import { loadSearchDocs } from '../lib/search-index';

export async function GET() {
  const docs = await loadSearchDocs();
  return new Response(JSON.stringify(docs), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
