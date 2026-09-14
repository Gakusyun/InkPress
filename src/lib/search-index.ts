import { getCollection } from 'astro:content';
import { buildSearchDocs, type SearchDoc } from './search';
import { getPublishedPosts } from './posts';

/** 构建期统一产出搜索索引 */
export async function loadSearchDocs(): Promise<SearchDoc[]> {
  const posts = await getPublishedPosts();
  const entries = await getCollection('posts');
  const rawBodies = new Map(entries.map((e) => [e.id, e.body ?? '']));
  return buildSearchDocs(posts, rawBodies);
}
