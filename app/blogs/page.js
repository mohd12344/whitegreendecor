"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BlogListSkeleton } from "@/components/services/skeletons/SectionSkeleton";

const featured = {
  category: "White Green Decors",
  title:
    "We don’t just write blogs; we create decent literary pieces to enrich your knowledge about traditional and contemporary décor ideas and turning into reality",
  date: "April 14, 2025",
  image: "/services/mehndi-2.jpg",
};

export default function BlogPage() {
  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    const blogFetch = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/blogs`,
      );
      const data = await res.json();
      setblogs(data.result);
    };
    blogFetch();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div
          href={`/blog/${featured.slug}`}
          className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14"
        >
          <div className="flex flex-col gap-4 order-2 lg:order-1 pt-10">
            <span className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#1a4d2e] font-medium bg-[#1a4d2e]/8 px-3 py-1.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a4d2e]" />
              {featured.category}
            </span>

            <h1 className="font-black text-4xl sm:text-5xl md:text-7xl sm:mb-3">
              Blogs
            </h1>
            <div className="flex items-start gap-3 group">
              <span className="w-1.5 h-12 rounded-full bg-gradient-to-b from-[#0f3d2e] to-[#1a4d2e] shadow-sm" />

              <h1 className="font-serif text-xl sm:text-3xl sm:leading-[1.15] text-gray-900 group-hover:text-[#1a4d2e] transition-colorsduration-300 tracking-tight">
                {featured.title}
              </h1>
            </div>
            <Link
              href={"#blogs"}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a4d2e] mt-4 sm:mt-6.5 group-hover:gap-2.5 transition-all duration-200"
            >
              See blogs
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e8f0eb] order-1 lg:order-2">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-gray-300 text-lg">✦</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>
      </div>

      <section
        id="blogs"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12 pb-20"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Articles
          </h2>
          <span className="text-sm text-[#1a4d2e] font-medium">All posts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length === 0 ? (
            <BlogListSkeleton />
          ) : (
            blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-[#1a4d2e]/8 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-video bg-[#e8f0eb] overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2.5">
                  <span className="text-[10px] tracking-widest uppercase text-[#1a4d2e] font-medium">
                    {blog.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 text-[15px] leading-snug group-hover:text-[#1a4d2e] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-[13px] leading-relaxed line-clamp-2 font-light">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-50">
                    <span className="text-[12px] text-gray-400">
                      {blog.date}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#1a4d2e]/8 flex items-center justify-center text-[#1a4d2e] text-sm group-hover:bg-[#1a4d2e] group-hover:text-white transition-colors duration-200">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
