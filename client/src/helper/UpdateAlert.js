
import Swal from "sweetalert2";

const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export const orderStatusUpdate = async (currentStatus) => {
  const { value: newStatus } = await Swal.fire({
    title: 'Update Order Status',
    input: 'select',
    inputOptions: ORDER_STATUSES.reduce((acc, status) => {
      acc[status] = status;
      return acc;
    }, {}),
    inputValue: currentStatus,
    showCancelButton: true,
    confirmButtonText: 'Update',
    cancelButtonText: 'Cancel',
    inputValidator: (value) => {
      if (!value) return 'You need to select a status!';
    }
  });

  return newStatus; // returns null if cancelled
};

export const successAlert = (message) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer: 1500,
    showConfirmButton: false,
  });
};

export const errorAlert = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
};
