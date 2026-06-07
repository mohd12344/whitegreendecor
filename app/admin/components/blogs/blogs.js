"use client";
import { useState, useRef, useContext, useEffect } from "react";
import Image from "next/image";
import { useEditor, EditorContent } from "@tiptap/react";
import TiptapLink from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
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
  category: "General",
  date: new Date().toISOString().split("T")[0],
  readTime: "5 min read",
  image: "",
  content: "",
  slug: "",
};

// ── Rich Text Editor ──────────────────────────────────────────────────────────

function RichEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline cursor-pointer" },
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // sync when blog switches
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (current !== value) {
      editor.commands.setContent(value || "");
    }
  }, [value]);

  if (!editor) return null;

  const setLink = () => {
    const prev = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter URL:", prev);
    if (url === null) return; // cancelled
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200 flex-wrap">
        <ToolBtn
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="font-bold"
        >
          B
        </ToolBtn>

        <div className="w-px h-4 bg-gray-200 mx-1 shrink-0" />

        {/* Link button — select text first, then click */}
        <ToolBtn active={editor.isActive("link")} onClick={setLink} blue>
          🔗 Link
        </ToolBtn>

        {editor.isActive("link") && (
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="text-[11px] px-2 py-1 rounded-lg text-red-400 hover:bg-red-50 font-semibold transition-all"
          >
            Remove Link
          </button>
        )}
      </div>

      {/* Writing area */}
      <EditorContent
        editor={editor}
        className="
          px-3 py-2.5 min-h-[200px] text-sm
          [&_.ProseMirror]:outline-none
          [&_.ProseMirror]:min-h-[180px]
          [&_.ProseMirror_h2]:text-base
          [&_.ProseMirror_h2]:font-bold
          [&_.ProseMirror_h2]:text-[#0d2818]
          [&_.ProseMirror_h2]:mt-4
          [&_.ProseMirror_h2]:mb-1
          [&_.ProseMirror_h3]:text-sm
          [&_.ProseMirror_h3]:font-semibold
          [&_.ProseMirror_h3]:text-[#0d2818]
          [&_.ProseMirror_h3]:mt-3
          [&_.ProseMirror_h3]:mb-1
          [&_.ProseMirror_p]:text-sm
          [&_.ProseMirror_p]:text-gray-600
          [&_.ProseMirror_p]:leading-relaxed
          [&_.ProseMirror_p]:mb-2
          [&_.ProseMirror_a]:text-blue-600
          [&_.ProseMirror_a]:underline
          [&_.ProseMirror_strong]:font-bold
          [&_.ProseMirror_strong]:text-gray-800
        "
      />

      <p className="text-[10px] text-zinc-800 px-3 pb-2">
        Tip: Select any word → click H2 / H3 / B / 🔗 Link from toolbar above
      </p>
    </div>
  );
}

function ToolBtn({ active, onClick, children, className = "", blue = false }) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all ${
        active
          ? blue
            ? "bg-blue-600 text-white"
            : "bg-[#1a4d2e] text-white"
          : "text-gray-500 hover:bg-gray-200"
      } ${className}`}
    >
      {children}
    </button>
  );
}

// ── Blog Edit Form ────────────────────────────────────────────────────────────

function BlogEditForm({ blogId, draft, onChange, onSave }) {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="flex flex-col gap-2 min-h-[300px] overflow-y-auto pr-0.5">
      <input
        value={draft.title ?? ""}
        onChange={(e) => onChange("title", e.target.value)}
        className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-[#0d2818] outline-none focus:border-[#1a4d2e] w-full"
        placeholder="Blog title"
      />
      <input
        value={draft.category ?? ""}
        onChange={(e) => onChange("category", e.target.value)}
        className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-500 outline-none focus:border-[#1a4d2e] w-full"
        placeholder="Category (e.g. Wedding)"
      />
      <textarea
        value={draft.excerpt ?? ""}
        onChange={(e) => onChange("excerpt", e.target.value)}
        rows={2}
        className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-500 outline-none focus:border-[#1a4d2e] w-full resize-none"
        placeholder="Short excerpt / description"
      />
      <div className="flex gap-2">
        <input
          type="date"
          value={draft.date ?? ""}
          onChange={(e) => onChange("date", e.target.value)}
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-500 outline-none focus:border-[#1a4d2e] w-full"
        />
        <input
          value={draft.readTime ?? ""}
          onChange={(e) => onChange("readTime", e.target.value)}
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-500 outline-none focus:border-[#1a4d2e] w-full"
          placeholder="5 min read"
        />
      </div>
      <input
        value={draft.slug ?? ""}
        onChange={(e) => onChange("slug", e.target.value)}
        className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-400 outline-none focus:border-[#1a4d2e] w-full font-mono"
        placeholder="slug (auto-generated if empty)"
      />

      {/* ── Write Content toggle button ── */}
      <button
        onClick={() => setShowEditor((v) => !v)}
        className={`flex items-center justify-between w-full px-3 py-2 rounded-xl border text-sm font-semibold transition-all mt-1 ${
          showEditor
            ? "border-[#1a4d2e] bg-[#1a4d2e]/5 text-[#1a4d2e]"
            : "border-gray-200 text-gray-500 hover:border-[#1a4d2e] hover:text-[#1a4d2e]"
        }`}
      >
        <span>✏️ Write Content</span>
        <span className="text-[10px] font-normal text-gray-400">
          {draft.content && draft.content !== "<p></p>"
            ? "✓ has content"
            : "empty"}{" "}
          {showEditor ? "▲" : "▼"}
        </span>
      </button>

      {showEditor && (
        <RichEditor
          value={draft.content}
          onChange={(html) => onChange("content", html)}
        />
      )}

      <button
        onClick={onSave}
        className="w-full py-2.5 bg-[#1a4d2e] text-white text-sm font-semibold rounded-full hover:bg-[#0d2818] transition-colors mt-1"
      >
        Save & Publish
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

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

  const scroll = (dir) =>
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });

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
    } catch {
      showNotification("Something went wrong", "error");
    } finally {
      hideLoading();
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setDrafts((prev) => ({ ...prev, [blog._id]: { ...blog } }));
  };

  const handleChange = (id, field, value) =>
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));

  const toggleActive = async (id, value) => {
    showLoading();
    const blog = blogs.find((b) => b._id === id);
    const res = await updateBlog(id, { ...blog, isActive: value });
    if (res.error || !res.result) {
      hideLoading();
      showNotification(res.error || "Failed", "error");
      return;
    }
    setBlogs((prev) =>
      prev.map((b) => (b._id === id ? { ...b, isActive: value } : b)),
    );
    hideLoading();
  };

  const handleSave = async (id) => {
    const { _id, ...cleanDraft } = drafts[id];
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
      hideLoading();
      return;
    }
    await updateBlog(id, { image });
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], image } }));
    setBlogs((prev) => prev.map((b) => (b._id === id ? { ...b, image } : b)));
    hideLoading();
    return image;
  };

  // Replace the entire return in Blogs with this:

  return (
    <div className="flex flex-col gap-4">
      {/* Header row — unchanged */}
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
      {/* Scrollable row — add items-start and a fixed height */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 scroll-smooth items-start"
        style={{ scrollbarWidth: "none", height: "600px" }}
      >
        {/* Add new card */}
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

        {Loads ? (
          <div className="flex items-center px-6 text-sm text-gray-400">
            Loading...
          </div>
        ) : (
          blogs.map((blog) => {
            const isEditing = editingId === blog._id;
            const draft = drafts[blog._id] || blog;

            return (
              <div
                key={blog._id}
                className={`flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] group relative ${
                  isEditing
                    ? "h-[580px] overflow-y-auto ring-2 ring-[#1a4d2e] rounded-2xl p-2"
                    : ""
                }`}
              >
                {/* Image */}
                <div className="relative w-full h-[160px] sm:h-[200px] rounded-2xl overflow-hidden mb-3">
                  {blog.image ? (
                    <Image
                      src={blog.image}
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

                  {/* Top-right action buttons */}
                  <div className="absolute top-2.5 right-2.5 flex gap-1.5 z-10 flex-wrap justify-end">
                    <button
                      onClick={() => toggleActive(blog._id, !blog.isActive)}
                      className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-semibold transition-all ${
                        blog.isActive
                          ? "border-green-400 text-green-600 bg-green-50 hover:bg-green-100"
                          : "border-gray-300 text-gray-400 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${blog.isActive ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      {blog.isActive ? "Live" : "Draft"}
                    </button>
                    <button
                      onClick={() =>
                        isEditing ? setEditingId(null) : handleEdit(blog)
                      }
                      className="text-xs px-2.5 py-1 rounded-full bg-white/90 text-[#1a4d2e] font-semibold shadow hover:bg-[#1a4d2e] hover:text-white transition-all"
                    >
                      {isEditing ? "Close" : "Edit"}
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/90 text-red-500 font-semibold shadow hover:bg-red-500 hover:text-white transition-all"
                    >
                      Del
                    </button>
                  </div>

                  {blog.category && (
                    <div className="absolute bottom-2.5 left-2.5 bg-white/90 text-[#1a4d2e] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {blog.category}
                    </div>
                  )}
                </div>

                {/* Card view info */}
                <div className="flex flex-col gap-1.5 px-0.5">
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
                    {blog.content && blog.content !== "<p></p>" && (
                      <span className="ml-auto text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                        ✓ content
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Edit drawer — fixed overlay, completely outside the scroll row ── */}
      {editingId && drafts[editingId] && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setEditingId(null)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-[#0d2818] text-sm">
                Edit Blog
              </h3>
              <button
                onClick={() => setEditingId(null)}
                className="text-gray-400 hover:text-gray-700 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Image inside drawer */}
            <div className="relative w-full h-44 shrink-0">
              {drafts[editingId].image ? (
                <Image
                  src={drafts[editingId].image}
                  fill
                  alt="blog"
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
              <label className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 cursor-pointer">
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
                  Change Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files[0])
                      handleImage(editingId, e.target.files[0]);
                  }}
                />
              </label>
            </div>

            {/* Scrollable form — this NOW works because drawer has fixed height */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <BlogEditForm
                blogId={editingId}
                draft={drafts[editingId]}
                onChange={(field, value) =>
                  handleChange(editingId, field, value)
                }
                onSave={() => handleSave(editingId)}
              />
            </div>
          </div>
        </>
      )}
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
