import { useState, useRef } from "react";

export default function TableGrid({ tables, setTables }) {
  const [draggedId, setDraggedId] = useState(null);
  const gridRef = useRef(null);

  const handleDragStart = (id) => setDraggedId(id);

  const handleDrop = (targetId) => {
    if (draggedId === null || draggedId === targetId) return;

    const dragged = tables.find((t) => t.id === draggedId);
    const target = tables.find((t) => t.id === targetId);

    // Gabungkan meja (merge)
    const merged = {
      ...target,
      id: target.id,
      name: `${target.name} + ${dragged.name}`,
      mergedTables: [...(target.mergedTables || [target.id]), dragged.id],
      seats: (target.seats || 2) + (dragged.seats || 2),
    };

    const newTables = tables
      .filter((t) => t.id !== draggedId && t.id !== targetId)
      .concat(merged);

    setTables(newTables);
    setDraggedId(null);
  };

  return (
    <div
      ref={gridRef}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 100px)",
        gap: "16px",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {tables.map((table) => (
        <div
          key={table.id}
          draggable
          onDragStart={() => handleDragStart(table.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(table.id)}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "12px",
            backgroundColor: table.mergedTables ? "#a5f3fc" : "#bfdbfe",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "grab",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            fontWeight: "600",
            color: "#1e3a8a",
          }}
        >
          <div>Table {table.id}</div>
          <small>{table.seats || 2} seats</small>
          {table.mergedTables && (
            <small style={{ color: "#065f46" }}>
              Merged: {table.mergedTables.join(", ")}
            </small>
          )}
        </div>
      ))}
    </div>
  );
}
