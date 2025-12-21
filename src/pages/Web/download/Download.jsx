import React from "react";
import "./Download.css";

const DownloadPage = () => {
  return (
    <div className="download-page">
      <div className="download-container">
        <h1 className="title">Download Cashier Payments</h1>
         <p className="subtitle">
            For Windows
        </p>
        <div className="download-grid">
          {/* KIRI: Spesifikasi */}
          <div className="specs">
            <h2>System recommended</h2>
            <ul>
              <li><strong>OS:</strong> Windows 10 / 11 (64-bit)</li>
              <li><strong>Processor:</strong> Intel i5 or higher</li>
              <li><strong>Memory:</strong> 4 / 6 GB RAM minimum</li>
              <li><strong>Storage:</strong> 500 MB free space</li>
              <li><strong>Internet:</strong> Required for activation</li>
            </ul>
          </div>

          {/* KANAN: Download Info */}
          <div className="download-info">
            <p className="desc">Version 1.2.0 — Updated October 2025</p>

            <a href="/downloads/MyWinReactApp.exe" className="btn-primary">
              Download for Windows
            </a>

            <a href="/release-notes" className="btn-outline">
              View Release Notes
            </a>

            <p className="file-info">File size: 85 MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
