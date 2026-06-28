import { RiRobot2Fill } from "react-icons/ri";

/**
 * NotFoundPage — 404 page displayed for unknown routes.
 */
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] px-4">
      <div className="text-center animate-fade-in-up">
        {/* 404 text */}
        <h1 className="text-8xl sm:text-9xl font-black gradient-text mb-4">
          404
        </h1>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/10 flex items-center justify-center mx-auto mb-6">
          <RiRobot2Fill className="text-blue-400/60 text-2xl" />
        </div>

        {/* Message */}
        <h2 className="text-xl font-semibold text-slate-200 mb-2">
          Page Not Found
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back button */}
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
