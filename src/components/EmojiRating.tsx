import { useState } from "react";

const EmojiRating = ({
  category,
  selectedRating,
  onRatingChange,
}: {
  category: string;
  selectedRating: number | null;
  onRatingChange: (category: string, rating: number) => void;
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const emojis = ["😡", "😞", "😐", "😊", "😍"];

  return (
    <div className="flex space-x-4 text-3xl">
      {emojis.map((emoji, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={index}
            className={`rounded-full w-10 h-10 bg-gray-300 transition-transform transform ${
              selectedRating === ratingValue || hoverRating === ratingValue
                ? "scale-150 text-yellow-400 bg-lime-400"
                : "scale-100 opacity-60 text-gray-300"
            }`}
            onClick={() => onRatingChange(category, ratingValue)}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(null)}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  );
};

export default EmojiRating;
