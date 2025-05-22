import React from 'react';

type Props = {
  isOwner?: boolean;
};

export default function ProductSkeleton({ isOwner = false }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col animate-pulse">
      <div className="bg-gray-300 rounded-lg w-full h-60 mb-4" />
      <div className="h-6 bg-gray-300 rounded mb-2" />
      <div className="h-5 bg-gray-300 rounded mb-2 w-3/4" />
      {isOwner && <div className="h-4 bg-gray-300 rounded mb-1 w-1/2" />}
      {isOwner && <div className="h-8 bg-gray-300 rounded mt-auto" />}
    </div>
  );
}
