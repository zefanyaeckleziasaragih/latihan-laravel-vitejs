import Swal from "sweetalert2";

export const showSuccess = (message) => {
    Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: message,
        showConfirmButton: false,
        timer: 2000,
    });
};

export const showError = (message) => {
    Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: message,
        confirmButtonText: "OK",
    });
};

export const showConfirm = async (message) => {
    const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
    });

    return result.isConfirmed;
};

export const showLoading = (message = "Memproses...") => {
    Swal.fire({
        title: message,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
};

export const closeLoading = () => {
    Swal.close();
};
