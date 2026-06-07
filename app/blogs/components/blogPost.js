"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BlogPostSkeleton } from "@/components/services/skeletons/SectionSkeleton";

// ── Block renderer ──────────────────────────────────────────────────────────
function RenderBlock({ block }) {
  if (block.type === "heading") {
    const Tag = block.level === 3 ? "h3" : "h2";
    const cls =
      block.level === 3
        ? "font-serif text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-3"
        : "font-serif text-2xl sm:text-3xl font-semibold text-gray-900 mt-10 mb-4";
    return <Tag className={cls}>{block.text}</Tag>;
  }

  if (block.type === "paragraph") {
    return (
      <p className="text-gray-600 leading-relaxed font-light text-base sm:text-lg mb-5">
        {block.text}
      </p>
    );
  }

  if (block.type === "link_paragraph") {
    return (
      <p className="text-gray-600 leading-relaxed font-light text-base sm:text-lg mb-5">
        {block.segments?.map((seg, i) =>
          seg.isLink ? (
            <a
              key={i}
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {seg.text}
            </a>
          ) : (
            <span key={i}>{seg.text}</span>
          ),
        )}
      </p>
    );
  }

  return null;
}

export default function BlogPost({ slug }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/blogs/${slug}`);
        const data = await res.json();
        setBlog(data.result);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    const fetchRecent = async () => {
      try {
        // ← add try/catch, it was missing
        const res = await fetch("/api/blog"); // ← no 's' — fetches all blogs
        const data = await res.json();
        setRecentBlogs(
          data.result?.filter((b) => b.slug !== slug).slice(0, 3) || [],
        );
      } catch (err) {
        console.error("Failed to fetch recent blogs:", err);
      }
    };
    fetchBlog();
    fetchRecent();
  }, [slug]);

  if (loading) return <BlogPostSkeleton />;
  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Blog not found
      </div>
    );

  const hasBlocks = blog.blocks?.length > 0;

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-4">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#1a4d2e] transition-colors mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back to Blog
        </Link>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-gray-900 mb-4">
          {blog.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-400 mb-8 flex-wrap">
          <span>{blog.date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{blog.readTime}</span>
          <span className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#1a4d2e] font-medium bg-[#1a4d2e]/8 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a4d2e]" />
            {blog.category}
          </span>
        </div>

        {blog.image && (
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#e8f0eb] mb-10">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {/* dangerouslySetInnerHTML renders the HTML TipTap saved */}
        <div
          className="
      prose prose-lg prose-gray max-w-none
      prose-headings:font-serif prose-headings:text-gray-900
      prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:font-semibold
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:font-semibold
      prose-p:text-gray-600 prose-p:leading-relaxed prose-p:font-light prose-p:text-base prose-p:sm:text-lg
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
      prose-strong:text-gray-800 prose-strong:font-semibold
    "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* CTA — unchanged */}
        <div className="mt-24 p-6 sm:p-8 bg-[#1a4d2e] rounded-2xl text-center">
          <p className="text-white/70 text-sm mb-1">Ready to make it happen?</p>
          <h3 className="text-white text-xl font-semibold mb-4">
            Book your decoration today
          </h3>
          <a
            href={`https://wa.me/916398484419?text=Hi! I just read your blog about ${blog.title} and I'd love to book a decoration!`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#1a4d2e] text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#d4af37] transition-colors"
          >
            <Image
              src="/svg-icons/whatsapp.svg"
              className="invert"
              width={24}
              height={24}
              alt="whatsapp"
            />
            Book Now on WhatsApp
          </a>
        </div>
      </article>
      {/* ── Recent Blogs ── */}
      {recentBlogs.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-gray-300 text-lg">✦</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Recent Articles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recentBlogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-[#1a4d2e]/8 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-video bg-[#e8f0eb] overflow-hidden">
                  {blog.image && (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <span className="text-[10px] tracking-widest uppercase text-[#1a4d2e] font-medium">
                    {blog.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 text-[14px] leading-snug group-hover:text-[#1a4d2e] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-50">
                    <span className="text-[11px] text-gray-400">
                      {blog.date}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#1a4d2e]/8 flex items-center justify-center text-[#1a4d2e] text-sm group-hover:bg-[#1a4d2e] group-hover:text-white transition-colors duration-200">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
