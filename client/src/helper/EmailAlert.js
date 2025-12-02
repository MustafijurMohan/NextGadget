import Swal from "sweetalert2";
import { VerifyEmail } from "../api/user";

export const EmailAlert = async () => {
  const { value: email } = await Swal.fire({
    title: "Enter your email address",
    input: "email",
    inputLabel: "We will send you a verification code",
    inputPlaceholder: "Enter your email address",
    confirmButtonText: "Send OTP",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Email is required!";
      }
    },
  });

  if (email) {
    const res = await VerifyEmail(email);
    if (res?.success) {
      Swal.fire("Success!", "OTP sent to your email", "success");
      return email; // return email for navigation
    } else {
      Swal.fire("Error!", res?.message || "Failed to send OTP", "error");
      return null;
    }
  }
  return null;
};
