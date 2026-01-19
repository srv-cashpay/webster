import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const trackPackage = async ({ courier, resi }) => {
  const response = await axios.get(`${API_BASE_URL}/track/line`, {
    params: {
      courier,
      awb: resi,
    },
  });

  return response.data;
};
