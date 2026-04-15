import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

export default function SortableCard({
  card,
  isEditing,
  getStar,
  onEdit,
  onDelete,
  onChange,
  onSave,
  onImage,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
      className={`flex-shrink-0 w-[180px] sm:w-[270px] md:w-[300px] group cursor-pointer relative ${
        isEditing ? "ring-2 ring-[#1a4d2e] rounded-2xl" : ""
      }`}
    >
      {/* Image */}
      <div className="relative w-full h-[200px] sm:h-[280px] md:h-[350px] rounded-2xl overflow-hidden mb-3 md:mb-4">
        <Image
          src={card.image || "/services/"}
          fill
          alt={card.title}
          className={`object-cover transition-transform duration-500 ${
            !isEditing && "group-hover:scale-110"
          }`}
        />

        {isEditing ? (
          // ── Edit mode — click to change image ──
          <label className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
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
              <span className="text-white text-sm font-semibold">
                Edit Image
              </span>
              <span className="text-white/60 text-xs">Click to choose</span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const uploadedUrl = await onImage(file);
                onChange("image", uploadedUrl);
              }}
            />
          </label>
        ) : (
          // ── View mode — normal hover overlay ──
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <button className="w-full py-2.5 bg-white text-[#0d2818] font-semibold rounded-full text-sm hover:bg-[#d4af37] transition-colors">
                View Details
              </button>
            </div>
          </>
        )}

        {/* Top buttons */}
        <div className="absolute top-3 left-3 z-10">
          {/* Card drag handle */}
          <div
            {...attributes}
            {...listeners}
            className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow"
            title="Drag to reorder"
          >
            <DragIcon size={14} />
          </div>
        </div>

        <div className="absolute top-3 right-3 flex gap-1.5 z-10">
          <button
            onClick={onEdit}
            className="text-xs px-2.5 py-1 rounded-full bg-white/90 text-[#1a4d2e] font-semibold shadow hover:bg-[#1a4d2e] hover:text-white transition-all"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            onClick={onDelete}
            className="text-xs px-2.5 py-1 rounded-full bg-white/90 text-red-500 font-semibold shadow hover:bg-red-500 hover:text-white transition-all"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="info flex flex-col gap-0.5">
        <Image
          src={`/svg-icons/${getStar(card.title)}.svg`}
          width={100}
          height={20}
          alt="stars"
        />

        {isEditing ? (
          <div className="flex flex-col gap-2 mt-1">
            <input
              value={card.title}
              onChange={(e) => onChange("title", e.target.value)}
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm font-semibold text-[#0d2818] outline-none focus:border-[#1a4d2e] w-full"
              placeholder="Title"
            />
            <input
              value={card.price}
              type="number"
              onChange={(e) => onChange("price", e.target.value)}
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-[#6e6f6f] font-semibold outline-none focus:border-[#1a4d2e] w-full"
              placeholder="Price e.g. 13000"
            />
            <input
              value={card.type}
              onChange={(e) => onChange("type", e.target.value)}
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-[#6e6f6f] outline-none focus:border-[#1a4d2e] w-full"
              placeholder="Type"
            />
            <textarea
              value={card.description}
              onChange={(e) => onChange("description", e.target.value)}
              rows={2}
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-[#6e6f6f] outline-none focus:border-[#1a4d2e] w-full resize-none"
              placeholder="Description"
            />
            <textarea
              value={card.inclusion}
              onChange={(e) => onChange("inclusion", e.target.value)}
              rows={2}
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-[#6e6f6f] outline-none focus:border-[#1a4d2e] w-full resize-none"
              placeholder="Inclusions (comma separated)"
            />
            <button
              onClick={onSave}
              className="w-full py-2 bg-[#1a4d2e] text-white text-sm font-semibold rounded-full hover:bg-[#0d2818] transition-colors mt-1"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <h4 className="text-[#0d2818] font-semibold text-sm sm:text-base md:text-lg group-hover:text-[#1a4d2e] transition-colors">
                {card.title}
              </h4>
              <div className="text-sm sm:text-base text-[#6e6f6f] font-semibold">
                ₹{Number(card.price).toLocaleString()} <span>&bull;</span>{" "}
                {card.type}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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
