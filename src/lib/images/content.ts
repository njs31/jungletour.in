import { destinations } from "@/data/destinations";
import { blogPosts } from "@/data/blog";
import type { BlogPost, Destination } from "@/types";
import { fetchAllImageOverrides } from "@/lib/images/overrides";

export async function getDestinationsWithOverrides(): Promise<Destination[]> {
  const overrides = await fetchAllImageOverrides();

  return destinations.map((dest) => ({
    ...dest,
    image: overrides[`destination:${dest.id}`]?.url || dest.image,
  }));
}

export async function getBlogPostsWithOverrides(): Promise<BlogPost[]> {
  const overrides = await fetchAllImageOverrides();

  return blogPosts.map((post) => ({
    ...post,
    image: overrides[`blog:${post.id}`]?.url || post.image,
  }));
}
