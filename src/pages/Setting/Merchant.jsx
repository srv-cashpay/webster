import React, { useState, useEffect } from "react";

const Merchant = ({ data, onChange, onSave }) => {
  const [isChanged, setIsChanged] = useState(false);
  const [originalData] = useState(data); // menyimpan data awal untuk dibandingkan

  useEffect(() => {
    // cek apakah ada perubahan dari originalData
    const changed = Object.keys(data).some((key) => data[key] !== originalData[key]);
    setIsChanged(changed);
  }, [data, originalData]);

  return (
    <div>
      {/* Header dengan Save di kanan */}
     <div
  style={{
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    gap: "15px"
  }}
>
  <h5 style={{ margin: 0 }}>Merchant</h5>
  <button
    onClick={onSave}
    disabled={!isChanged}
    style={{
      padding: "4px 10px",        // tombol lebih kecil
      fontSize: "12px",           // font lebih kecil
      border: "none",
      borderRadius: "4px",
      backgroundColor: isChanged ? "#000" : "#ccc",
      color: "#fff",
      cursor: isChanged ? "pointer" : "not-allowed",
    }}
  >
    Save
  </button>
</div>


      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Owner & Merchant Name */}
        <div style={{ display: "flex", gap: "30px" }}>
          <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            Owner Name:
            <input type="text" name="ownerName" value={data.ownerName} onChange={onChange} style={{ width: "100%", padding: "8px" }}/>
          </label>
          <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            Merchant Name:
            <input type="text" name="merchantName" value={data.merchantName} onChange={onChange} style={{ width: "100%", padding: "8px" }}/>
          </label>
        </div>

        {/* City & Country */}
        <div style={{ display: "flex", gap: "30px" }}>
          <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            City:
            <input type="text" name="city" value={data.city} onChange={onChange} style={{ width: "100%", padding: "8px" }}/>
          </label>
          <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            Country:
            <input type="text" name="country" value={data.country} onChange={onChange} style={{ width: "100%", padding: "8px" }}/>
          </label>
        </div>

        {/* Address */}
        <div>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            Address:
            <textarea
              name="address"
              value={data.address || ""}
              onChange={onChange}
              rows={3}
              style={{ width: "100%", padding: "8px", resize: "vertical" }}
              placeholder="Enter full address"
            />
          </label>
        </div>

        {/* Currency, Zip & Phone */}
        <div style={{ display: "flex", gap: "30px" }}>
          <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            Currency:
            <select name="currency" value={data.currency} onChange={onChange} style={{ width: "100%", padding: "8px" }}>
              <option value="">-- Select Currency --</option>
              <option value="$">$</option>
              <option value="Rp">Rp</option>
            </select>
          </label>
          <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            Zip:
            <input type="text" name="zip" value={data.zip} onChange={onChange} style={{ width: "100%", padding: "8px" }}/>
          </label>
          <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            Phone:
            <input type="text" name="phone" value={data.phone} onChange={onChange} style={{ width: "100%", padding: "8px" }}/>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Merchant;
