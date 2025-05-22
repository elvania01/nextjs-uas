import React from 'react';

type Props = {
  isOwner?: boolean;
};

export default function ProductTitleSkeleton({ isOwner = false }: Props) {
  return (
    <>
      <div className="bg-gray-300 rounded-xl w-48 h-12 animate-pulse mx-auto" />
      {isOwner && <div className="bg-gray-300 rounded-full w-36 h-10 animate-pulse absolute right-6" />}
    </>
  );
}
