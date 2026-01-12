import { useState } from "react";
import { useParams } from "react-router-dom";
import text from "../../locales/text";
import { FaComments } from "react-icons/fa";
import "./ChatWidget.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(null);

  const { lang } = useParams();
  const language = lang === "id" ? "id" : "en";
  const t = text[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiMessage(null);

    const formData = {
      full_name: e.target.full_name.value,
      email: e.target.email.value,
      whatsapp: e.target.whatsapp.value,
      business_name: e.target.business_name.value,
    };

    try {
      const res = await fetch("https://api.cashpay.co.id/widget/create/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status) {
        setApiMessage(data.message || "Chat sent successfully!");
      } else if (data.meta?.status === false) {
        setApiMessage(data.meta?.message || "Something went wrong");
      } else {
        setApiMessage("Unknown response from server");
      }

      setShowChatRoom(true);
    } catch (err) {
      console.error(err);
      setApiMessage("Network error, try again!");
      setShowChatRoom(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="chat-button" onClick={() => setOpen(!open)}>
        Hallo Admin <FaComments size={16} />
      </button>

      {open && (
        <div className="chat-container">
          {showChatRoom ? (
            <div className="chat-room">
              <h3 className="chat-title">Chat Room</h3>
              <div className="chat-message-box">
                <p>👋 {apiMessage || t.weWillContactYouSoon}</p>
              </div>
            </div>
          ) : (
            <>
              <h3 className="form-title">{t.scheduleDemo}</h3>
              <h3 className="form-subtitle">{t.weWillContactYouSoon}</h3>

              <form className="chat-form" onSubmit={handleSubmit}>
                <input name="full_name" type="text" placeholder={t.fullName} required />
                <input name="email" type="email" placeholder="Email" required />
                <input name="whatsapp" type="text" placeholder="WhatsApp" required />
                <input name="business_name" type="text" placeholder={t.businessName} required />

                <button type="submit" disabled={loading}>
                  {loading ? "Sending..." : t.send}
                </button>

                <h3 className="powered-by">
                  Powered by <span>Scrumly</span>
                </h3>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
