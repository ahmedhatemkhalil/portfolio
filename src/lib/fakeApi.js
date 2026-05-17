export async function fetchPosts(limit = 8) {
  const res = await fetch(
    `https://dummyjson.com/posts?limit=${limit}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();
console.log({data})
  return data.posts ?? [];
}