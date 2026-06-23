import LoadingImage from "@/components/ui/LoadingImage";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { getBlogPostHref } from "@/lib/trips/links";
import { blogPosts } from "@/data/blog";

export default function Blog() {
  return (
    <section id="blog" className="scroll-mt-20 py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <SectionHeader
            eyebrow="Stories & Guides"
            title="Travel Guides & Inspiration"
            subtitle="Tips, guides, and travel stories from the trails."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={getBlogPostHref(post.id)}
              className="group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <LoadingImage
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-orange-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <p className="mt-3 text-xs font-semibold text-orange-500 flex items-center gap-1">
                  Read more <span>→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
