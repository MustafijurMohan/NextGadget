
import Reveal from "../animation/Reveal";
import { EmailAlert } from "../helper/EmailAlert"; // adjust path
import { useNavigate } from "react-router";

const EmailVerify = () => {
    const navigate = useNavigate()

    const handleVerify = async () => {
    const email = await EmailAlert(); // get email from SweetAlert
        if (email) {
        // navigate to OTP page & pass email in state
        navigate("/otp-verify", { state: { email } });
        }
    };

  return (
    <Reveal>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-6">
          Enter your email to receive a verification code.
        </p>
        <button
          onClick={handleVerify}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
        >
          Verify Email
        </button>
      </div>
    </div>
    </Reveal>
  );
};

export default EmailVerify;
