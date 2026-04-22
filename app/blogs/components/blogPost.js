"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BlogPostSkeleton } from "@/components/services/skeletons/SectionSkeleton";

export default function BlogPost({ slug }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true); // ← ye add karo

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
    fetchBlog();
  }, [slug]);

  if (loading) return <BlogPostSkeleton />;

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Blog not found
      </div>
    );

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
          {blog?.title}
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

        {/* image sirf tab dikhao jab ho */}
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
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:font-light prose-a:text-[#1a4d2e] prose-a:no-underline hover:prose-a:underline">
          <p className="text-lg">{blog.content}</p>
        </div>

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
    </main>
  );
}
