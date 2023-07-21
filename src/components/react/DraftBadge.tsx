interface DraftBadgeProps {
  isPublished?: boolean;
}

export const DraftBadge = ({ isPublished }: DraftBadgeProps) => {
  if (isPublished) return null;
  return (
    <div
      className="absolute px-8 py-1 font-semibold tracking-tight text-red-800 uppercase transform -rotate-45 bg-red-200 rounded-md shadow-lg opacity-75"
      style={{ top: 0, left: -50 }}
    >
      Draft
    </div>
  );
};
