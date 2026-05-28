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
          src={card.images?.[0] || card.image || "/services/placeholder.jpg"}
          fill
          alt={card.title}
          className={`object-cover transition-transform duration-500 ${
            !isEditing && "group-hover:scale-110"
          }`}
        />

        {isEditing ? (
          <div className="absolute inset-0 flex flex-col bg-black/50 p-2 gap-2 overflow-y-auto">
            {/* Existing images */}
            <div className="flex flex-wrap gap-1.5">
              {(card.images || (card.image ? [card.image] : [])).map(
                (url, idx) => (
                  <div
                    key={idx}
                    className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0"
                  >
                    <Image src={url} fill alt="" className="object-cover" />
                    <button
                      onClick={() => {
                        const updated = [...(card.images || [])].filter(
                          (_, i) => i !== idx,
                        );
                        onChange("images", updated);
                        onChange("image", updated[0] || "");
                      }}
                      className="absolute inset-0 bg-black/50 text-white text-xs flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ),
              )}

              {/* Add more images */}
              <label className="w-14 h-14 rounded-lg border-2 border-dashed border-white/50 flex items-center justify-center cursor-pointer hover:border-white transition-colors shrink-0">
                <span className="text-white text-xl leading-none">+</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={async (e) => {
                    const files = Array.from(e.target.files);
                    for (const file of files) {
                      const url = await onImage(file);
                      if (url) {
                        const existing = card.images?.length
                          ? card.images
                          : card.image
                            ? [card.image]
                            : [];
                        const updated = [...existing, url];
                        onChange("images", updated);
                        onChange("image", updated[0]);
                      }
                    }
                  }}
                />
              </label>
            </div>

            <div className="mt-auto flex items-center justify-center">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full shadow-sm">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />

                <span className="text-[10px] text-white/90 tracking-wide">
                  First image will be used as thumbnail
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <button className="w-full py-2.5 bg-white text-[#0d2818] font-semibold rounded-full text-sm hover:bg-[#d4af37] transition-colors">
                View Details
              </button>
            </div>
            {/* Image count badge */}
            {card.images?.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                +{card.images.length - 1} more
              </div>
            )}
          </>
        )}

        {/* Top buttons — same rakho */}
        <div className="absolute top-3 left-3 z-10">
          <div
            {...attributes}
            {...listeners}
            className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow"
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
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm font-semibold text-[#0d2818] outline-none focus:border-[#1a4d2e] w-full"
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
              value={`${card.type} (non changable)`}
              readOnly
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-[#6e6f6f] outline-none focus:border-[#1a4d2e] w-full bg-gray-50 cursor-default"
            />
            <input
              value={card.reviews ?? 128}
              onChange={(e) => onChange("reviews", e.target.value)}
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-[#6e6f6f] outline-none focus:border-[#1a4d2e] w-full"
              placeholder="Reviews eg: 134"
              type="number"
            />
            <textarea
              value={card.description}
              onChange={(e) => onChange("description", e.target.value)}
              rows={2}
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-[#6e6f6f] outline-none focus:border-[#1a4d2e] w-full resize-none sm:h-16"
              placeholder="Description"
            />
            <textarea
              value={card.inclusion}
              onChange={(e) => onChange("inclusion", e.target.value)}
              rows={2}
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-[#6e6f6f] outline-none focus:border-[#1a4d2e] w-full resize-none sm:h-16"
              placeholder="Inclusions (comma separated)"
            />
            <textarea
              value={card.exclusion}
              onChange={(e) => onChange("exclusion", e.target.value)}
              rows={2}
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-[#6e6f6f] outline-none focus:border-[#1a4d2e] w-full resize-none sm:h-16"
              placeholder="Exclusions (comma separated)"
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
