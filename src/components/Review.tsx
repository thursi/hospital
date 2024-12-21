// components/ReviewSection.tsx
import Image from 'next/image';
import React from 'react';

interface ReviewSectionProps {
  message: string;
  reviewDate: string;
  signUpLink: string;
  rating: number;
  reviewContent: string;
  onRatingChange: (value: string) => void;
  onReviewChange: (value: string) => void;
  reviewMessage: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  message,
  reviewDate,
  signUpLink,
  rating,
  reviewContent,
  onRatingChange,
  onReviewChange,
  reviewMessage,
}) => (
  <div>
    <div className="mb-2 text-gray-600 text-xs mt-3">
      {message}
    </div>

    <div className="p-3 border border-cyan-200 rounded bg-cyan-100 text-gray-500 text-xs mb-3">
      Sign up to add a review
      <a href={signUpLink} className="ml-2 text-red-600">
        Sign Up
      </a>
    </div>

    <div className="text-2xl font-bold mb-4 ">0 Reviews</div>

    <div className="flex items-start mb-4">
      <Image
        src="/rating.jpg"
        alt="Rating Image"
        width={80}
        height={80}
        className="mr-4"
      />
      <div className="flex flex-col bg-white p-4">
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <Image
                key={index}
                src="/star.svg"
                alt="Star"
                width={24}
                height={24}
                className={
                  index < rating
                    ? 'fill-current text-yellow'
                    : 'fill-current text-gray-400 mr-1'
                }
              />
            ))}
          </div>
        </div>
        <div className="text-gray-500 text-xs mb-3">
          Vethouse – {reviewDate}
        </div>
        <div className="text-gray-500 text-xs mb-3">
          {reviewContent}
        </div>
        <div className="mb-4 mt-5">
          <button
            type="submit"
            className="w-36 px-2 py-2 p-2 bg-red-500 text-white font-bold rounded hover:bg-yellow-500 hover:text-black"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <hr className="mb-4 " />

    <div className="text-xl mb-0">Leave a Review</div>
    <div className="text-xs mb-2 ">Rating</div>

    <div className="mb-4 text-gray-700">
      <select
        value={rating}
        onChange={(e) => onRatingChange(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      >
        {[...Array(5)].map((_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
    </div>
    <div className="text-xs mb-2 ">Your Review</div>
    <div className="mb-4">
      <textarea
        value={reviewMessage}
        onChange={(e) => onReviewChange(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
    </div>

    <div className="mb-4 mt-5">
      <button
        type="submit"
        className="w-36 px-2 py-2 p-2 bg-red-500 text-white font-bold rounded hover:bg-yellow-500 hover:text-black"
      >
        Submit
      </button>
    </div>
  </div>
);

export default ReviewSection;
