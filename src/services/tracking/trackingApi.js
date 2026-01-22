import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const trackPackage = async ({ courier, resi }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/web/track/line`, {
      params: { courier, awb: resi },
    });

    if (response.data.status !== 200) {
      throw new Error(response.data.message || "Gagal tracking paket");
    }

    return response.data;
  } catch (error) {
    console.error("trackPackage error:", error);
    throw error;
  }
};
