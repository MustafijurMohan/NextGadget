import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { ResetNewPassword } from "../api/user";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Reveal from "../animation/Reveal";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("verifyEmail") || "";
  const otp = localStorage.getItem("verifyOtp") || "";

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire("Error", "Password must be at least 6 characters long", "error");
      return;
    }

    const res = await ResetNewPassword(email, otp, newPassword);

    if (res?.success) {
      Swal.fire("Success", "Password reset successfully!", "success");
      localStorage.removeItem("verifyEmail");
      localStorage.removeItem("verifyOtp");
      navigate("/login");
    }
  };

  return (
    <Reveal>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <p className="text-gray-600 mb-6">
          Enter your new password for <b>{email || "your account"}</b>
        </p>

        {/* New Password */}
        <div className="relative mb-4">
          <input
            type={showNew ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowNew((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showNew ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirm ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Reset Password
        </button>
      </div>
    </div>
    </Reveal>
  );
};

export default ResetPassword;
