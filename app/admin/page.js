"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import SortableSection from "./components/sortableSection";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  fetchSections,
  createSection,
  patchSection,
  removeSection,
  reorderSections,
  Logout,
  uploadImage,
} from "@/lib/api";
import Blogs from "./components/blogs/blogs";
import { NotificationContext } from "@/lib/contexts/serviceContext";

// ── Small reusable toggle pill ──────────────────────────────────────────────
function TogglePill({ label, description, active, onChange, color = "green" }) {
  const colors = {
    green: {
      on: "bg-[#0d2818] text-white border-[#0d2818]",
      off: "bg-white text-gray-400 border-gray-200",
      dot: "bg-green-400",
    },
    amber: {
      on: "bg-amber-600 text-white border-amber-600",
      off: "bg-white text-gray-400 border-gray-200",
      dot: "bg-amber-400",
    },
  };
  const c = colors[color];

  return (
    <button
      onClick={onChange}
      title={description}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold transition-all duration-200 select-none ${
        active ? c.on : c.off
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? c.dot : "bg-gray-300"}`}
      />
      {label}
    </button>
  );
}

// ── Section flags row shown inside each SortableSection via prop ────────────
// We pass this as a rendered node so SortableSection stays unchanged
function SectionFlagRow({ section, onPatch }) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {/* ── Toggles row ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] text-gray-400 uppercase tracking-wider mr-1">
          Page Type:
        </span>

        <TogglePill
          label="Specific"
          description="House-decoration style page"
          active={!!section.specific}
          onChange={() => onPatch(section._id, { specific: !section.specific })}
          color="green"
        />

        <TogglePill
          label="Custom"
          description="Wedding-style page"
          active={!!section.custom}
          onChange={() => onPatch(section._id, { custom: !section.custom })}
          color="amber"
        />
      </div>

      {/* ── Preview info card ── */}
      {section.custom && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs max-w-2xl">
          <p className="font-semibold text-amber-700 mb-2">
            🎊 Page Type: Full Wedding Decoration
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Bundle */}
            <div className="bg-white rounded-lg border border-amber-200 p-3 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="font-semibold text-amber-700">
                  Bundle Cards — ₹20,000+
                </span>
              </div>
              <p className="text-zinc-500 leading-relaxed">
                Shown as <strong>"We Decorate Every Venue"</strong> section.
                Full image overlay style with title & price at bottom.
              </p>
              <p className="text-zinc-400 mt-1">
                👉 Inme likho: complete wedding packages like{" "}
                <em>Mandap + Stage + Entry + Reception</em> — jo full event
                cover kare.
              </p>
            </div>

            {/* Single service */}
            <div className="bg-white rounded-lg border border-green-200 p-3 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                <span className="font-semibold text-green-700">
                  Single Service Cards — below ₹20,000
                </span>
              </div>
              <p className="text-zinc-500 leading-relaxed">
                Shown as <strong>"Our Wedding Decor Services"</strong>{" "}
                horizontal scroll section.
              </p>
              <p className="text-zinc-400 mt-1">
                👉 Inme likho: individual services like{" "}
                <em>Mandap Decoration, Stage Decoration, Haldi Setup</em> —
                single event ke liye.
              </p>
            </div>
          </div>

          <p className="text-amber-600 mt-2.5 font-medium">
            ⚠️ Price 20k se upar rakho = Bundle mein jayega · Price 20k se niche
            = Single service mein jayega
          </p>
        </div>
      )}

      {section.specific && !section.custom && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-xs max-w-2xl">
          <p className="font-semibold text-green-700 mb-2">
            🏠 Page Type: House Decoration Style
          </p>
          <div className="flex flex-col gap-1 text-green-700">
            <p>
              • Hero pe <strong>starting price badge</strong> dikhega + trust
              badges strip
            </p>
            <p>
              • Budget cards <strong>(2-col grid mobile)</strong> + Package
              cards in venue style
            </p>
            <p>
              • Bottom: <strong>"Get Quote in 30 Seconds"</strong> +{" "}
              <strong>"What Affects the Price?"</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification, showLoading, hideLoading } =
    useContext(NotificationContext);
  const router = useRouter();
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    loadSections();
  }, []);

  async function loadSections() {
    setLoading(true);
    const data = await fetchSections();
    setSections(data);
    setLoading(false);
  }

  // ── Section actions ──────────────────────────────────────────────────────

  async function handleSectionDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((s) => s._id === active.id);
    const newIndex = sections.findIndex((s) => s._id === over.id);
    const reordered = arrayMove(sections, oldIndex, newIndex);
    setSections(reordered);
    await reorderSections(reordered.map((s) => s._id));
  }

  async function handleAddSection() {
    const section = await createSection("New Section");
    setSections((prev) => [...prev, section]);
    showNotification("Section added below");
  }

  async function handleDeleteSection(id) {
    showLoading();
    if (!confirm("Delete this section and all its items?")) {
      hideLoading();
      return;
    }
    await removeSection(id);
    setSections((prev) => prev.filter((s) => s._id !== id));
    hideLoading();
  }

  async function handleRename(id, title) {
    const res = await patchSection(id, { title });
    if (res.error) {
      showNotification(res.error);
      return;
    }
    setSections((prev) =>
      prev.map((s) => (s._id === id ? { ...s, title } : s)),
    );
  }

  async function handleToggleActive(id, current) {
    showLoading();
    await patchSection(id, { isActive: !current });
    setSections((prev) =>
      prev.map((s) => (s._id === id ? { ...s, isActive: !current } : s)),
    );
    hideLoading();
  }

  async function handleBannerUpload(sectionId, file) {
    if (!file) return;
    try {
      showLoading("Uploading");
      const bannerImage = await uploadImage(file);
      const res = await patchSection(sectionId, { bannerImage });
      if (!res) throw new Error("Patch failed");
      setSections((prev) =>
        prev.map((s) => (s._id === sectionId ? { ...s, bannerImage } : s)),
      );
    } catch (err) {
      console.error(err);
      showNotification("Banner upload failed", "error");
    } finally {
      hideLoading();
    }
  }

  // ── NEW: patch any field(s) on a section ────────────────────────────────
  async function handlePatchSection(id, fields) {
    showLoading();
    try {
      const res = await patchSection(id, fields);
      if (res?.error) {
        showNotification(res.error, "error");
        return;
      }
      // ✅ res use karo — API se actual updated doc aata hai
      // (custom true hoga to specific bhi true hoga wahan)
      setSections((prev) =>
        prev.map((s) => (s._id === id ? { ...s, ...res } : s)),
      );
      showNotification("Updated");
    } catch {
      showNotification("Update failed", "error");
    } finally {
      hideLoading();
    }
  }

  async function handleLogout() {
    const res = await Logout();
    if (!res.success) {
      showNotification("Something went wrong", "error");
      return;
    }
    router.push("/");
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-26">
        <div>
          {/* ── Header ── */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0d2818]">
                Manage Services
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="text-gray-300"
                  >
                    <circle cx="5" cy="4" r="1.2" />
                    <circle cx="11" cy="4" r="1.2" />
                    <circle cx="5" cy="8" r="1.2" />
                    <circle cx="11" cy="8" r="1.2" />
                    <circle cx="5" cy="12" r="1.2" />
                    <circle cx="11" cy="12" r="1.2" />
                  </svg>
                  Drag to reorder
                </span>
                <span className="text-gray-200">•</span>
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  Toggle to show/hide
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleAddSection}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#1a4d2e] text-white text-sm font-semibold rounded-full hover:bg-[#0d2818] active:scale-95 transition-all shadow-sm"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="hidden sm:inline">Add Section</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-1 text-sm sm:text-base sm:px-5 py-0.5 sm:py-2 rounded-xl bg-white border border-red-400 text-red-500
                 hover:bg-red-50 hover:text-red-600 hover:border-red-500
                 active:scale-95 transition-all duration-200
                 shadow-sm hover:shadow-md font-medium"
              >
                Logout
              </button>
            </div>
          </div>

          {/* ── Sections ── */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleSectionDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s._id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-10 md:gap-14">
                {sections.map((section, index) => (
                  <div key={section._id} className="flex flex-col gap-1">
                    <SortableSection
                      section={section}
                      index={index}
                      onRename={(t) => handleRename(section._id, t)}
                      onBannerChange={(file) =>
                        handleBannerUpload(section._id, file)
                      }
                      onDelete={() => handleDeleteSection(section._id)}
                      onToggleActive={() =>
                        handleToggleActive(section._id, section.isActive)
                      }
                      flagRow={
                        <SectionFlagRow
                          section={section}
                          onPatch={handlePatchSection}
                        />
                      }
                    />
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* ── Blogs ── */}
        <div className="flex flex-col gap-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0d2818]">
            Manage Blogs
          </h1>
          <Blogs />
        </div>
      </div>
    </div>
  );
}
