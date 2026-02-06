import React from 'react'

export const JobSkeleton = () => {
  return (
    
    <div className="bg-white  rounded-2xl p-5 animate-pulse">
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-3" />
      <div className="h-3 w-1/3 bg-gray-200 rounded mb-4" />
      <div className="flex gap-4 mb-4">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>
      <div className="h-3 w-full bg-gray-200 rounded mb-2" />
      <div className="h-3 w-3/4 bg-gray-200 rounded" />
    </div>
  )
}
