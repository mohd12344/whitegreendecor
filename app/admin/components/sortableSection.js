import { useSortable } from "@dnd-kit/sortable";
import AdminSection from "./singleSection";
import { CSS } from "@dnd-kit/utilities";

export default function SortableSection({
  section,
  index,
  onRename,
  onDelete,
  onToggleActive,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section._id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      <AdminSection
        section={section}
        index={index}
        dragHandleProps={{ ...attributes, ...listeners }}
        onRename={onRename}
        onDelete={onDelete}
        onToggleActive={onToggleActive}
      />
    </div>
  );
}
