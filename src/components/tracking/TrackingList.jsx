import "./TrackingList.css";

import "./TrackingList.css";

export default function TrackingList({ courier, resi, data }) {
  if (!courier || !resi) return null;

  return (
    <section className="tracking-section">
      <div className="tracking-list">
        <h3>
          {courier.toUpperCase()} — {resi}
        </h3>

        <ul>
          {data?.history?.length > 0 && data.history[0].desc !== "" ? (
            data.history.map((item, i) => (
              <li key={i}>
                <div className="date">{item.date}</div>

                <div>
                  <div className="desc">{item.desc}</div>
                  {item.location && (
                    <div className="location">{item.location}</div>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li>
              <div className="desc">Belum ada riwayat pengiriman</div>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
