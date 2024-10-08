import React from 'react';
import Link from 'next/link' // or 'next/link' for Next.js if applicable

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-purple-600">404</h1>
        <p className="text-2xl md:text-3xl font-medium mt-4">Oops! Page Not Found</p>
        <p className="mt-2 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>

        <Link href="/" className="mt-6 inline-block bg-purple-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-purple-700 transition-all">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
