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
} from "@/lib/api";

import { NotificationContext } from "@/lib/contexts/serviceContext";

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

  // ── Section actions ──

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
      <div className="max-w-7xl mx-auto">
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
                <SortableSection
                  key={section._id}
                  section={section}
                  index={index}
                  onRename={(t) => handleRename(section._id, t)}
                  onDelete={() => handleDeleteSection(section._id)}
                  onToggleActive={() =>
                    handleToggleActive(section._id, section.isActive)
                  }
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
