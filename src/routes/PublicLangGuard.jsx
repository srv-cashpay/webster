import { Navigate, useParams } from "react-router-dom";

export default function PublicLangGuard({ children }) {
  const { lang } = useParams();

  // hanya /en yang valid untuk public
  if (lang !== "en") {
    return <Navigate to="/" replace />;
  }

  return children;
}
