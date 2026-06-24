
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideLoader } from "../redux/slice/loader"; // ✅ adjust path if different

const Loader = () => {
  const loading = useSelector((state) => state.loader.loading);
  const dispatch = useDispatch()

  // ✅ Auto-hide loader after 8 seconds (prevents infinite spinning)
  useEffect(() => {
    if (!loading) return

    const timer = setTimeout(() => {
      dispatch(hideLoader())
    }, 8000)

    return () => clearTimeout(timer) // cleanup on unmount
  }, [loading, dispatch])

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-gray-800 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-3 h-3 bg-gray-800 rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
};

export default Loader;