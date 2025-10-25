import { useState } from "react";
import {
  FaUtensils,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaPlusCircle,
  FaSearch,
  FaEdit,
} from "react-icons/fa";
import ReservationModal from "./ReservationModal";

export default function TableReservation() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [draggedId, setDraggedId] = useState(null);
  const [editId, setEditId] = useState(null); // ✅ untuk mode edit

  const [reservations, setReservations] = useState([
    {
      id: 1,
      name: "John Doe",
      table: 3,
      date: "2025-10-25",
      time: "18:30",
      guests: 2,
      status: "confirmed",
    },
    {
      id: 2,
      name: "Sarah Smith",
      table: 5,
      date: "2025-10-26",
      time: "20:00",
      guests: 4,
      status: "pending",
    },
  ]);

  const [newData, setNewData] = useState({
    name: "",
    table: "",
    date: "",
    time: "",
    guests: "",
    status: "pending",
  });

  const filtered = reservations.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.table.toString().includes(search)
  );

  // ✅ Tambah/Edit handler
  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (!newData.name || !newData.table || !newData.date || !newData.time)
      return alert("Lengkapi semua data terlebih dahulu!");

    if (editId) {
      // update data
      setReservations((prev) =>
        prev.map((r) =>
          r.id === editId
            ? {
                ...r,
                ...newData,
                table: parseInt(newData.table),
                guests: parseInt(newData.guests),
              }
            : r
        )
      );
    } else {
      // tambah baru
      const newItem = {
        id: reservations.length + 1,
        ...newData,
        table: parseInt(newData.table),
        guests: parseInt(newData.guests),
      };
      setReservations([...reservations, newItem]);
    }

    // reset form
    setNewData({
      name: "",
      table: "",
      date: "",
      time: "",
      guests: "",
      status: "pending",
    });
    setEditId(null);
    setShowForm(false);
  };

  // ✅ Edit button click
  const handleEdit = (id) => {
    const target = reservations.find((r) => r.id === id);
    setNewData(target);
    setEditId(id);
    setShowForm(true);
  };

  const handleDragStart = (id) => {
    setDraggedId(id);
  };

  const handleDrop = (targetId) => {
    if (draggedId === targetId) return;
    const dragged = reservations.find((r) => r.id === draggedId);
    const target = reservations.find((r) => r.id === targetId);

    const merged = {
      id: target.id,
      name: `${target.name} + ${dragged.name}`,
      table: `${target.table} & ${dragged.table}`,
      date: target.date,
      time: target.time,
      guests: target.guests + dragged.guests,
      status: "merged",
      mergedFrom: [dragged, target],
    };

    setReservations((prev) =>
      prev.filter((r) => r.id !== draggedId && r.id !== targetId).concat(merged)
    );
    setDraggedId(null);
  };

  const handleUnmerge = (id) => {
    const merged = reservations.find((r) => r.id === id);
    if (!merged?.mergedFrom) return;

    setReservations((prev) =>
      prev.filter((r) => r.id !== id).concat(merged.mergedFrom)
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Info Panel */}
<div
  style={{
    backgroundColor: "#e0f2fe",
    border: "1px solid #bae6fd",
    borderRadius: "10px",
    padding: "12px 16px",
    marginBottom: "20px",
    color: "#1e3a8a",
    fontSize: "14px",
    lineHeight: "1.6",
  }}
>
<strong>💡 Usage Instructions:</strong>
<ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
  <li>
    <b>Drag & Drop</b> one reservation card onto another to{" "}
    <b>merge</b> tables.
  </li>
  <li>
    <b>Right-click</b> on a merged card to{" "}
    <b>unmerge</b> it.
  </li>
  <li>
    Click the <b>Edit</b> button on any card to{" "}
    <b>modify the reservation details</b>.
  </li>
  <li>
    Click <b>Add Reservation</b> to{" "}
    <b>add a new reservation</b>.
  </li>
</ul>
</div>
    {/* Header + Search (bersampingan) */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap", // biar responsif di layar kecil
    gap: "10px",
  }}
>
  {/* Search Input */}
  <div style={{ position: "relative", maxWidth: "300px", flex: "1" }}>
    <FaSearch
      style={{
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#9ca3af",
      }}
    />
    <input
      type="text"
      placeholder="Search name or table..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "100%",
        padding: "10px 10px 10px 35px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        outline: "none",
        fontSize: "14px",
      }}
    />
  </div>

  {/* Add Button */}
  <button
    onClick={() => {
      setEditId(null);
      setNewData({
        name: "",
        table: "",
        date: "",
        time: "",
        guests: "",
        status: "pending",
      });
      setShowForm(true);
    }}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      whiteSpace: "nowrap",
    }}
  >
    <FaPlusCircle />
    <span>Add Reservation</span>
  </button>
</div>


      {/* Table Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // ✅ 4 kolom sejajar
          gap: "20px",
        }}
      >
        {filtered.map((r) => (
          <div
            key={r.id}
            draggable
            onDragStart={() => handleDragStart(r.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(r.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              handleUnmerge(r.id);
            }}
            style={{
              backgroundColor: r.status === "merged" ? "#e0f2fe" : "#fff",
              borderRadius: "16px",
              padding: "16px",
              border: "2px dashed #cbd5e1",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              cursor: "grab",
              transition: "0.2s",
            }}
            title={
              r.status === "merged"
                ? "Right-click to unmerge"
                : "Drag this card to another to merge"
            }
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#111827",
                }}
              >
                <FaUser color="#2563eb" /> {r.name}
              </h3>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  padding: "4px 8px",
                  borderRadius: "9999px",
                  backgroundColor:
                    r.status === "confirmed"
                      ? "#dcfce7"
                      : r.status === "pending"
                      ? "#fef9c3"
                      : r.status === "merged"
                      ? "#dbeafe"
                      : "#fee2e2",
                  color:
                    r.status === "confirmed"
                      ? "#166534"
                      : r.status === "pending"
                      ? "#92400e"
                      : r.status === "merged"
                      ? "#1d4ed8"
                      : "#991b1b",
                }}
              >
                {r.status}
              </span>
            </div>

            <p style={{ fontSize: "14px", color: "#4b5563" }}>
              <FaUtensils style={{ marginRight: 6, color: "#9ca3af" }} />
              Table #{r.table}
            </p>
            <p style={{ fontSize: "14px", color: "#4b5563" }}>
              <FaCalendarAlt style={{ marginRight: 6, color: "#9ca3af" }} />
              {r.date}
            </p>
            <p style={{ fontSize: "14px", color: "#4b5563" }}>
              <FaClock style={{ marginRight: 6, color: "#9ca3af" }} />
              {r.time}
            </p>
            <p style={{ fontSize: "14px", color: "#4b5563" }}>
              Guests: {r.guests}
            </p>

            {/* ✅ Tombol Edit */}
            <button
              onClick={() => handleEdit(r.id)}
              style={{
                marginTop: "10px",
                backgroundColor: "#10b981",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
              }}
            >
              <FaEdit /> Edit
            </button>
          </div>
        ))}
      </div>

      <ReservationModal
        show={showForm}
        onClose={() => {
          setShowForm(false);
          setEditId(null);
        }}
        onSubmit={handleAddOrEdit}
        newData={newData}
        setNewData={setNewData}
      />
    </div>
  );
}
