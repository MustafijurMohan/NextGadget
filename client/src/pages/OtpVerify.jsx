import { useState } from "react";
import { useNavigate, useLocation} from "react-router";
import OtpInput from "react-otp-input";
import { VerifyUserOtp } from "../api/user";
import Swal from "sweetalert2";
import Reveal from "../animation/Reveal";

const OtpVerify = () => {
    const [otp, setOtp] = useState("");
    const location = useLocation();
    const email = location.state?.email || localStorage.getItem("verifyEmail") || "";
    const navigate = useNavigate();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Swal.fire("Error", "Please enter a valid 6-digit OTP", "error");
      return;
    }

    const res = await VerifyUserOtp(email, otp);
    if (res?.success) {
        navigate("/reset-password");
    }
  };

  return (
    <Reveal>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-120 text-center">
        <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>
        <p className="text-gray-600 mb-6">
          Enter the 6-digit OTP sent to <b>{email}</b>
        </p>

        <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            isInputNum
            renderInput={(props) => <input {...props} />}
            shouldAutoFocus
            inputStyle={{
                width: "3rem",
                height: "3rem",
                margin: "0 0.5rem",
                fontSize: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
            }}
        />

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-2 mt-6 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Verify OTP
        </button>
      </div>
    </div>
    </Reveal>
  );
};

export default OtpVerify;
