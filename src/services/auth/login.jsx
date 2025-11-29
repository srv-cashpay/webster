import axios from "axios";
import Cookies from "js-cookie";

const API_KEY = "3f=Pr#g1@RU-nw=30";
const AUTH_BASE_URL = "https://cashpay.co.id:2356/api/auth";
const WEB_BASE_URL = "https://cashpay.co.id:2356/api/web";

/**
 * 🔹 Login Manual (email / WhatsApp)
 */
export const loginUser = async (payload) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/signin`, payload, {
      headers: { "X-Api-Key": API_KEY },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * 🔹 Login Google (web)
 */
export const loginWithGoogle = async (accessToken) => {
  try {
    const response = await axios.post(
      `${WEB_BASE_URL}/google`,
      { accessToken },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * 🔹 Simpan token ke cookies
 */
export const saveTokens = (data) => {
  if (!data) return;
  Cookies.set("token", data.token);
  Cookies.set("refresh_token", data.refresh_token);
  localStorage.setItem("token", data.merchant_id || data.token);
};
