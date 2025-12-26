import React, { useEffect, useState } from "react";
import "./qris.css";
import ScanLogo from "./ScanLogo";

const QrisPage = () => {
  const [qrisList, setQrisList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [qrFile, setQrFile] = useState(null);
  const [status, setStatus] = useState("active");

const [bankList, setBankList] = useState([]);
const [bankName, setBankName] = useState("");
const [accountName, setAccountName] = useState("");
const [accountNumber, setAccountNumber] = useState("");

const [ewalletList, setEwalletList] = useState([]);
const [ewalletType, setEwalletType] = useState("OVO");
const [ewalletName, setEwalletName] = useState("");
const [ewalletNumber, setEwalletNumber] = useState("");

const EWALLET_OPTIONS = ["OVO", "DANA", "GoPay", "ShopeePay"];
const availableEwallets = EWALLET_OPTIONS.filter(
  (type) => !ewalletList.some((item) => item.type === type)
);
const handleDeleteEwallet = (id) => {
  if (!window.confirm("Hapus e-wallet ini?")) return;

  setEwalletList((prev) => prev.filter((item) => item.id !== id));
};
  const fetchQris = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/qris");
      const data = await res.json();
      setQrisList(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQris();
  }, []);

  useEffect(() => {
  if (availableEwallets.length > 0) {
    setEwalletType(availableEwallets[0]);
  }
}, [ewalletList]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!qrFile) return alert("Silakan upload QRIS");

    try {
      const formData = new FormData();
      formData.append("file", qrFile);
      formData.append("status", status);

      await fetch("http://localhost:5000/api/qris/upload", {
        method: "POST",
        body: formData,
      });

      setQrFile(null);
      setStatus("active");
      fetchQris();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="qris-container">
      <div className="qris-header">
        <p>QRIS ini bisa ditampilkan ke pelangganmu</p>
      </div>

      <div className="qris-layout">
        {/* KIRI - UPLOAD */}
        <form className="qris-form" onSubmit={handleSubmit}>
      <div
  className="upload-box custom-upload"
  onClick={() => document.getElementById("qris-upload").click()}
>
  <ScanLogo size={64} />
  <h5>Upload QRIS</h5>
  <p>Klik area ini untuk mengunggah QRIS</p>

  {qrFile && (
    <div className="upload-preview">
      <span>{qrFile.name}</span>
    </div>
  )}

  <input
    id="qris-upload"
    type="file"
    accept="image/*"
    hidden
    onChange={(e) => setQrFile(e.target.files[0])}
  />
</div>
          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </select>
          </div>

          <button className="btn-simpan">Simpan QRIS</button>

          <p className="form-hint">
            QRIS yang disimpan dapat digunakan untuk transaksi pelanggan,
            Kamu harus aktifin Qris nya supaya pelanggan bisa liat
          </p>
        </form>

        {/* KANAN - LIST */}
        <div className="qris-list">
          <h3>Data QRIS</h3>

          {loading ? (
            <p className="empty">Memuat data...</p>
          ) : qrisList.length === 0 ? (
            <div className="qris-empty">
              <ScanLogo size={60} />
              <span>Belum ada QRIS terdaftar</span>
            </div>
          ) : (
            qrisList.map((item) => (
              <div className="qris-card" key={item.id}>
                <div className="qris-preview">
                  <img
                    src={item.qr_image}
                    alt="QRIS"
                  />
                </div>

                <div className="qris-info">
                  <strong>QRIS Merchant</strong>
                  <span className={`badge ${item.status}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* ===== GRID BANK ===== */}
<div className="bank-layout">
  {/* FORM BANK */}
  <div className="bank-form">
    <h3>Rekening Bank</h3>

    <div className="form-group">
      <label>Nama Bank</label>
      <input
        type="text"
        placeholder="Contoh: BCA"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label>Nama Pemilik</label>
      <input
        type="text"
        placeholder="Nama sesuai rekening"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label>No Rekening</label>
      <input
        type="text"
        placeholder="1234567890"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
    </div>

    <button
      className="btn-simpan"
      onClick={() => {
        if (!bankName || !accountName || !accountNumber)
          return alert("Lengkapi data bank");

        setBankList([
          ...bankList,
          {
            id: Date.now(),
            bankName,
            accountName,
            accountNumber,
          },
        ]);

        setBankName("");
        setAccountName("");
        setAccountNumber("");
      }}
    >
      Simpan Rekening
    </button>
  </div>

  {/* LIST BANK */}
  <div className="bank-list">
    <h3>Daftar Rekening</h3>

    {bankList.length === 0 ? (
      <p className="empty">Belum ada rekening</p>
    ) : (
      bankList.map((bank) => (
        <div className="bank-card" key={bank.id}>
          <strong>{bank.bankName}</strong>
          <span>{bank.accountName}</span>
          <small>{bank.accountNumber}</small>
        </div>
      ))
    )}
  </div>
</div>
{/* ===== GRID E-WALLET ===== */}
<div className="ewallet-layout">
  {/* FORM E-WALLET */}
  <div className="ewallet-form">
    <h3>E-Wallet</h3>

    <div className="form-group">
  <label>Jenis E-Wallet</label>
  <select
    value={ewalletType}
    onChange={(e) => setEwalletType(e.target.value)}
    disabled={availableEwallets.length === 0}
  >
    {availableEwallets.length === 0 ? (
      <option value="">Semua E-Wallet sudah ditambahkan</option>
    ) : (
      availableEwallets.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))
    )}
  </select>
</div>


    <div className="form-group">
      <label>Nama Pemilik</label>
      <input
        type="text"
        placeholder="Nama akun e-wallet"
        value={ewalletName}
        onChange={(e) => setEwalletName(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label>No HP / ID</label>
      <input
        type="text"
        placeholder="08xxxxxxxxxx"
        value={ewalletNumber}
        onChange={(e) => setEwalletNumber(e.target.value)}
      />
    </div>

    <button
      className="btn-simpan"
      onClick={() => {
  if (!ewalletName || !ewalletNumber)
    return alert("Lengkapi data e-wallet");

  if (ewalletList.some((e) => e.type === ewalletType))
    return alert("E-Wallet ini sudah ditambahkan");

  setEwalletList([
    ...ewalletList,
    {
      id: Date.now(),
      type: ewalletType,
      name: ewalletName,
      number: ewalletNumber,
    },
  ]);

  setEwalletName("");
  setEwalletNumber("");
}}
    >
      Simpan E-Wallet
    </button>
  </div>

  {/* LIST E-WALLET */}
  <div className="ewallet-list">
    <h3>Daftar E-Wallet</h3>

    {ewalletList.length === 0 ? (
      <p className="empty">Belum ada e-wallet</p>
    ) : (
      ewalletList.map((item) => (
        <div className="ewallet-card" key={item.id}>
          <div className="ewallet-badge">{item.type}</div>
          <strong>{item.name}</strong>
          <small>{item.number}</small>
          <button
      className="btn-delete"
      onClick={() => handleDeleteEwallet(item.id)}
    >
      Hapus
    </button>
        </div>
      ))
    )}
  </div>
</div>

    </div>
  );
};

export default QrisPage;
