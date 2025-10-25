import { FaTimes } from "react-icons/fa";

export default function ReservationModal({ show, onClose, onSubmit, newData, setNewData }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "24px",
          width: "100%",
          maxWidth: "400px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: "15px",
            top: "15px",
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "#9ca3af",
            fontSize: "18px",
          }}
        >
          <FaTimes />
        </button>

        <h2 style={{ marginBottom: "16px", color: "#1f2937" }}>Add Reservation</h2>

        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            placeholder="Customer Name"
            value={newData.name}
            onChange={(e) => setNewData({ ...newData, name: e.target.value })}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Table Number"
            value={newData.table}
            onChange={(e) => setNewData({ ...newData, table: e.target.value })}
            style={inputStyle}
          />
          <input
            type="date"
            value={newData.date}
            onChange={(e) => setNewData({ ...newData, date: e.target.value })}
            style={inputStyle}
          />
          <input
            type="time"
            value={newData.time}
            onChange={(e) => setNewData({ ...newData, time: e.target.value })}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Guests"
            value={newData.guests}
            onChange={(e) => setNewData({ ...newData, guests: e.target.value })}
            style={inputStyle}
          />

          <select
            value={newData.status}
            onChange={(e) => setNewData({ ...newData, status: e.target.value })}
            style={inputStyle}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button
            type="submit"
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  padding: "10px",
  fontSize: "14px",
  outline: "none",
};
