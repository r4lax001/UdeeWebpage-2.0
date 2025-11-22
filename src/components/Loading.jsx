import React from 'react';

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin`}></div>
    </div>
  );
};

// Skeleton Loader for Cards
export const CardSkeleton = ({ variant = 'default' }) => {
  if (variant === 'listing') {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse p-2">
        <div className="h-[190px] bg-gray-200 rounded-xl"></div>
        <div className="p-3 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="flex gap-2 mt-2">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-16 overflow-hidden shadow-lg border border-gray-100 animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

// Full Page Loading
export const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="mt-4 text-gray-600 font-medium">กำลังโหลด...</p>
      </div>
    </div>
  );
};

// Button Loading State
export const ButtonLoader = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <LoadingSpinner size="sm" />
      <span>กำลังโหลด...</span>
    </div>
  );
};

