"use client";

import { useState, useRef, useContext, useEffect } from "react";
import Image from "next/image";
import {
  postBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  uploadImage,
} from "@/lib/api";
import { NotificationContext } from "@/lib/contexts/serviceContext";

const EMPTY_BLOG = {
  title: "New blog",
  excerpt: "blog about decoration (short description)",
  category: "General (category)",
  date: "20/4/2026",
  readTime: "8m",
  image: "",
  content: "Haldi decoration is about decoration",
  slug: "",
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [Loads, setLoads] = useState(false);
  const [drafts, setDrafts] = useState({});
  const scrollRef = useRef(null);
  const { showNotification, showLoading, hideLoading } =
    useContext(NotificationContext);

  useEffect(() => {
    const load = async () => {
      setLoads(true);
      const res = await getBlogs();
      if (res.result) setBlogs(res.result);
      setLoads(false);
    };
    load();
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const handleAdd = async () => {
    showLoading();
    try {
      const post = await postBlog(EMPTY_BLOG);
      const blog = post.result;
      if (!blog) {
        showNotification("Failed to create blog", "error");
        return;
      }
      setBlogs((prev) => [
        { ...EMPTY_BLOG, _id: blog._id, slug: blog.slug },
        ...prev,
      ]);
      setEditingId(blog._id);
      setDrafts((prev) => ({
        ...prev,
        [blog._id]: { ...EMPTY_BLOG, _id: blog._id, slug: blog.slug },
      }));
    } catch (err) {
      showNotification("Something went wrong", "error");
    } finally {
      hideLoading(); 
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setDrafts((prev) => ({ ...prev, [blog._id]: { ...blog } }));
  };

  const handleChange = (id, field, value) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const toggleActive = async (id, value) => {
    showLoading();
    const blog = blogs.find((b) => b._id === id);
    const res = await updateBlog(id, { ...blog, isActive: value });

    if (res.error || !res.result) {
      hideLoading();
      showNotification(res.error || "Failed to update", "error");
      return;
    }

    setBlogs((prev) =>
      prev.map((b) => (b._id === id ? { ...b, isActive: value } : b)),
    );
    hideLoading();
  };

  const handleSave = async (id) => {
    const draft = drafts[id];
    const { _id, ...cleanDraft } = draft;
    showLoading();

    const res = await updateBlog(id, { ...cleanDraft, isActive: true });

    if (res.error || !res.result) {
      hideLoading();
      showNotification(res.error || "Failed to save", "error");
      return;
    }

    setBlogs((prev) => prev.map((b) => (b._id === id ? { ...res.result } : b)));
    setEditingId(null);
    hideLoading();
    showNotification("Blog saved!", "success");
  };

  const handleDelete = async (id) => {
    showLoading();
    const res = await deleteBlog(id);
    if (res.error) {
      hideLoading();
      showNotification(res.error, "error");
      return;
    }
    setBlogs((prev) => prev.filter((b) => b._id !== id));
    if (editingId === id) setEditingId(null);
    hideLoading();
    showNotification("Blog deleted", "success");
  };

  const handleImage = async (id, file) => {
    showLoading("uploading");
    const image = await uploadImage(file);
    if (!image) {
      showNotification("Something went wrong", "error");
    }
    await updateBlog(id, { image });
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], image } }));
    setBlogs((prev) => prev.map((b) => (b._id === id ? { ...b, image } : b)));
    hideLoading();

    return image;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header row with arrows */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {blogs.length} blog{blogs.length !== 1 ? "s" : ""}
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-[#1a4d2e] hover:text-white hover:border-[#1a4d2e] transition-all shadow-sm"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 bg-[#1a4d2e] text-white rounded-full flex items-center justify-center hover:bg-[#0d2818] transition-all shadow-sm"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Add New Card */}
        <div
          onClick={handleAdd}
          className="flex-shrink-0 w-[200px] sm:w-[260px] md:w-[290px] h-[340px] sm:h-[420px] rounded-2xl border-2 border-dashed border-[#1a4d2e]/40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#1a4d2e] hover:bg-[#1a4d2e]/5 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#1a4d2e] flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-white text-2xl leading-none">+</span>
          </div>
          <span className="text-[#1a4d2e] text-sm font-semibold">
            Add New Blog
          </span>
        </div>

        {/* Blog Cards */}
        {Loads ? (
          <div className="">Loading...</div>
        ) : (
          blogs.map((blog) => {
            const isEditing = editingId === blog._id;
            const draft = drafts[blog._id] || blog;

            return (
              <div
                key={blog._id}
                className={`flex-shrink-0 w-[200px] sm:w-[260px] md:w-[290px] group relative ${
                  isEditing ? "ring-2 ring-[#1a4d2e] rounded-2xl" : ""
                }`}
              >
                {/* Image */}
                <div className="relative w-full h-[200px] sm:h-[240px] md:h-[260px] rounded-2xl overflow-hidden mb-3">
                  {(isEditing ? draft.image : blog.image) ? (
                    <Image
                      src={isEditing ? draft.image || "/services/" : blog.image}
                      fill
                      alt={blog.title || "Blog"}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#e8f0eb] flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-[#1a4d2e]/30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Edit mode image overlay */}
                  {isEditing && (
                    <label className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 cursor-pointer">
                      <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <span className="text-white text-xs font-semibold">
                        Edit Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files[0])
                            handleImage(blog._id, e.target.files[0]);
                        }}
                      />
                    </label>
                  )}

                  {/* Top-right buttons */}
                  <div className="absolute top-2.5 right-2.5 flex gap-1.5 z-10">
                    <button
                      onClick={() => toggleActive(blog._id, !blog.isActive)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${
                        blog.isActive
                          ? "border-green-400 text-green-600 bg-green-50 hover:bg-green-100"
                          : "border-gray-300 text-gray-400 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${blog.isActive ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      {blog.isActive ? "Active" : "Hidden"}
                    </button>
                    <button
                      onClick={() =>
                        isEditing ? setEditingId(null) : handleEdit(blog)
                      }
                      className="text-xs px-2.5 py-1 rounded-full bg-white/90 text-[#1a4d2e] font-semibold shadow hover:bg-[#1a4d2e] hover:text-white transition-all"
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/90 text-red-500 font-semibold shadow hover:bg-red-500 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Category badge — view mode */}
                  {!isEditing && blog.category && (
                    <div className="absolute bottom-2.5 left-2.5 bg-white/90 text-[#1a4d2e] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {blog.category}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1.5 px-0.5">
                  {isEditing ? (
                    <div className="flex flex-col gap-2">
                      <input
                        value={draft.title ?? ""}
                        onChange={(e) =>
                          handleChange(blog._id, "title", e.target.value)
                        }
                        className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-[#0d2818] outline-none focus:border-[#1a4d2e] w-full"
                        placeholder="Blog title"
                      />
                      <input
                        value={draft.category ?? ""}
                        onChange={(e) =>
                          handleChange(blog._id, "category", e.target.value)
                        }
                        className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-500 outline-none focus:border-[#1a4d2e] w-full"
                        placeholder="Category (e.g. Wedding)"
                      />
                      <textarea
                        value={draft.excerpt ?? ""}
                        onChange={(e) =>
                          handleChange(blog._id, "excerpt", e.target.value)
                        }
                        rows={2}
                        className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-500 outline-none focus:border-[#1a4d2e] w-full resize-none"
                        placeholder="Short excerpt / description"
                      />
                      <div className="flex gap-2">
                        <input
                          type="date"
                          value={draft.date ?? ""}
                          onChange={(e) =>
                            handleChange(blog._id, "date", e.target.value)
                          }
                          className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-500 outline-none focus:border-[#1a4d2e] w-full"
                        />
                        <input
                          value={draft.readTime ?? ""}
                          onChange={(e) =>
                            handleChange(blog._id, "readTime", e.target.value)
                          }
                          className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-500 outline-none focus:border-[#1a4d2e] w-full"
                          placeholder="5 min read"
                        />
                      </div>
                      <input
                        value={draft.slug ?? ""}
                        onChange={(e) =>
                          handleChange(blog._id, "slug", e.target.value)
                        }
                        className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-400 outline-none focus:border-[#1a4d2e] w-full font-mono"
                        placeholder="slug (auto-generated if empty)"
                      />
                      <textarea
                        value={draft.content ?? ""}
                        onChange={(e) =>
                          handleChange(blog._id, "content", e.target.value)
                        }
                        rows={3}
                        className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-500 outline-none focus:border-[#1a4d2e] w-full resize-none"
                        placeholder="Full blog content..."
                      />
                      <button
                        onClick={() => handleSave(blog._id)}
                        className="w-full py-2 bg-[#1a4d2e] text-white text-sm font-semibold rounded-full hover:bg-[#0d2818] transition-colors"
                      >
                        Save Blog
                      </button>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-[#0d2818] font-semibold text-sm sm:text-base leading-snug line-clamp-2">
                        {blog.title || (
                          <span className="text-gray-300 italic">Untitled</span>
                        )}
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 font-light">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-0.5">
                        {blog.date && (
                          <span>
                            {new Date(blog.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                        {blog.date && blog.readTime && <span>·</span>}
                        {blog.readTime && <span>{blog.readTime}</span>}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const ChevronLeftIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default Blogs;
