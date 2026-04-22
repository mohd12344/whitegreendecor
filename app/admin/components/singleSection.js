"use client";
import { useRef, useState, useEffect, useContext } from "react";
import SortableCard from "./sortableCard";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { horizontalListSortingStrategy } from "@dnd-kit/sortable";

import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import {
  fetchProduct,
  patchProduct,
  createProduct,
  removeProduct,
  reorderProduct,
  uploadImage,
} from "@/lib/api";

import { NotificationContext } from "@/lib/contexts/serviceContext";

export default function AdminSection({
  section,
  index,
  dragHandleProps,
  onRename,
  onDelete,
  onToggleActive,
}) {
  const scrollRef = useRef(null);
  const [cards, setCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const { showNotification, showLoading, hideLoading } =
    useContext(NotificationContext);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(section.title);
  const [editingCardId, setEditingCardId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetchProduct(section._id).then((data) => {
      setCards(data);
      setLoadingCards(false);
    });
  }, [section._id]);

  function scroll(dir) {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  }

  function getStar(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash += str.charCodeAt(i);
    return hash % 10 < 8 ? "5star" : "4star";
  }

  async function handleCardDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const oldIndex = cards.findIndex((c) => c._id === active.id);
    const newIndex = cards.findIndex((c) => c._id === over.id);
    const reordered = arrayMove(cards, oldIndex, newIndex);
    setCards(reordered);
    await reorderProduct(reordered.map((c) => c._id));
  }

  async function handleAddCard() {
    showLoading();
    const newCard = await createProduct({
      sectionId: section._id,
      title: "New Item",
      type: section.title,
      price: 0,
      description: "",
      inclusion: "",
      image: "",
    });
    setCards((prev) => [newCard, ...prev]);
    setEditingCardId(newCard._id);
    hideLoading();
  }

  function handleCardChange(id, field, value) {
    setCards((prev) =>
      prev.map((c) => (c._id === id ? { ...c, [field]: value } : c)),
    );
  }

  async function handleSaveCard(card) {
    showLoading("Saving");
    const res = await patchProduct(card._id, { ...card });
    if (!res.success) {
      hideLoading();
      showNotification(res.error, "error");
      return;
    }
    setEditingCardId(null);

    hideLoading();
  }

  async function handleDeleteCard(id) {
    showLoading();
    if (!confirm("Delete this item?")) {
      hideLoading();
      return;
    }
    await removeProduct(id);
    setCards((prev) => prev.filter((c) => c._id !== id));
    hideLoading();
  }

  async function ImageUpload(id, file) {
    showLoading("uploading");
    const image = await uploadImage(file);
    if (!image) {
      showNotification("Something went wrong", "error");
      hideLoading();
      return;
    }
    const card = cards.find((c) => c._id === id);
    await patchProduct(id, {
      ...card,
      image,
    });
    setCards((prev) => prev.map((c) => (c._id === id ? { ...c, image } : c)));
    hideLoading();
    return image;
  }

  return (
    <main className="flex flex-col sm:gap-5">
      {/* Title Row */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {/* Drag Handle */}
          <div
            {...dragHandleProps}
            className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors"
            title="Drag to reorder section"
          >
            <DragIcon />
          </div>

          <span className="text-xs text-gray-300 font-mono">#{index + 1}</span>

          <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl md:text-3xl font-bold text-[#0d2818] flex items-center gap-2">
            <span className="text-[#d4af37]">✦</span>
            {isEditingTitle ? (
              <input
                autoFocus
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                onBlur={() => {
                  onRename(titleDraft);
                  setIsEditingTitle(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onRename(titleDraft);
                    setIsEditingTitle(false);
                  }
                }}
                className="border-b-2 border-[#1a4d2e] bg-transparent outline-none font-['Playfair_Display'] font-bold text-[#0d2818] text-xl sm:text-2xl md:text-3xl w-48"
              />
            ) : (
              <span
                onClick={() => setIsEditingTitle(true)}
                className="cursor-text"
              >
                {section.title}
              </span>
            )}
          </h3>
        </div>

        <div className="flex items-center gap-2 flex-wrap pb-3.5 sm:pb-0">
          {/* isActive Toggle */}
          <button
            onClick={onToggleActive}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${
              section.isActive
                ? "border-green-400 text-green-600 bg-green-50 hover:bg-green-100"
                : "border-gray-300 text-gray-400 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${section.isActive ? "bg-green-500" : "bg-gray-300"}`}
            />
            {section.isActive ? "Active" : "Hidden"}
          </button>

          <button
            onClick={() => setIsEditingTitle(true)}
            className="text-xs px-3 py-1.5 border border-[#1a4d2e] text-[#1a4d2e] rounded-full hover:bg-[#1a4d2e] hover:text-white transition-all"
          >
            Rename
          </button>
          <button
            onClick={onDelete}
            className="text-xs px-3 py-1.5 border border-red-400 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"
          >
            Delete Section
          </button>
          <div className="arrows hidden sm:flex gap-1.5 pl-2">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-[#1a4d2e] hover:text-white hover:border-[#1a4d2e] transition-all shadow-sm"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 sm:w-10 sm:h-10 bg-[#1a4d2e] text-white rounded-full flex items-center justify-center hover:bg-[#0d2818] transition-all shadow-sm"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Row — horizontally sortable */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleCardDragEnd}
      >
        <SortableContext
          items={cards.map((c) => c._id)}
          strategy={horizontalListSortingStrategy}
        >
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Add New Card */}
            <div
              onClick={handleAddCard}
              className="flex-shrink-0 w-[180px] sm:w-[270px] md:w-[300px] h-[280px] sm:h-[360px] md:h-[430px] rounded-2xl border-2 border-dashed border-[#1a4d2e]/40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#1a4d2e] hover:bg-[#1a4d2e]/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#1a4d2e] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl leading-none">+</span>
              </div>
              <span className="text-[#1a4d2e] text-sm font-semibold">
                Add New Card
              </span>
            </div>

            {loadingCards ? (
              <div className="flex items-center px-6 text-sm text-gray-400">
                Loading...
              </div>
            ) : (
              cards.map((card) => (
                <SortableCard
                  key={card._id}
                  card={card}
                  isEditing={editingCardId === card._id}
                  getStar={getStar}
                  onEdit={() =>
                    setEditingCardId(
                      editingCardId === card._id ? null : card._id,
                    )
                  }
                  onDelete={() => handleDeleteCard(card._id)}
                  onChange={(field, value) =>
                    handleCardChange(card._id, field, value)
                  }
                  onSave={() => handleSaveCard(card)}
                  onImage={(file) => ImageUpload(card._id, file)}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
    </main>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const DragIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
    <circle cx="5" cy="4" r="1.2" />
    <circle cx="11" cy="4" r="1.2" />
    <circle cx="5" cy="8" r="1.2" />
    <circle cx="11" cy="8" r="1.2" />
    <circle cx="5" cy="12" r="1.2" />
    <circle cx="11" cy="12" r="1.2" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
