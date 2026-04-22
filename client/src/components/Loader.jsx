import { useSelector } from "react-redux";

const Loader = () => {
  const loading = useSelector((state) => state.loader.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg z-100">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinning ring with gradient */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-t-transparent border-pink-500 rounded-full animate-spin"></div>
          <div className="absolute inset-3 border-4 border-t-transparent border-blue-500 rounded-full animate-spin-slow"></div>
        </div>

        {/* Animated dots */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
        </div>

        {/* Loading text with pulse */}
        <p className="text-white text-lg font-semibold animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
