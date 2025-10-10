import React from "react";

const NotFound = () => {
  return (
    <div className="fixed inset-0 z-0 h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="card w-full max-w-lg bg-white shadow-xl border border-blue-200">
        <div className="card-body flex flex-col items-center">
          <span className="text-6xl mb-4 text-blue-500">🚫</span>
          <h2 className="card-title text-2xl text-blue-700 font-bold mb-2">
            Page Not Found (404)
          </h2>
          <p className="text-gray-600 text-center mb-4">
            Sorry, the page you requested was not found.
            <br />
            Please check the URL or return to the Science Competition home page.
          </p>
          <a href="/" className="btn btn-primary btn-wide mt-2">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
