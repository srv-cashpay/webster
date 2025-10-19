import { useParams, useNavigate } from "react-router-dom";
import text from "../locales/text";

export default function useLanguage() {
  const { lang } = useParams();
  const navigate = useNavigate();

  // ✅ fallback ke "en" jika tidak ada /lang
  const language = lang === "id" ? "id" : "en";
  const t = text[language];

  // ✅ Helper navigate tetap berdasarkan bahasa aktif
  const goTo = (path) => {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    navigate(`/${language}${normalized}`);
  };

  return { language, t, goTo };
}
