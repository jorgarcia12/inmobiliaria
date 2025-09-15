import axios from "axios";

interface IUploadResponse {
  url: string;
}
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const cloudinaryService = {
  uploadImage: async (file: File): Promise<IUploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    console.log("Imagen subida");
    return { url: response.data.secure_url };
  },
};
