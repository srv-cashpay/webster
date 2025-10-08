import React, { useState } from 'react';

const LandingPage = () => {
  const [voucherCode, setVoucherCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validVouchers = ['DISKON10', 'HEMAT50K', 'GRATISONGKIR'];

  const handleInputChange = (e) => {
    setVoucherCode(e.target.value.toUpperCase());
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!voucherCode.trim()) {
      setMessage({ type: 'error', text: 'Kode voucher tidak boleh kosong.' });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (validVouchers.includes(voucherCode)) {
      setMessage({ type: 'success', text: `Voucher "${voucherCode}" berhasil diverifikasi!` });
    } else {
      setMessage({ type: 'error', text: `Kode voucher "${voucherCode}" tidak valid.` });
    }

    setIsLoading(false);
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100vw',
      minHeight: '100vh',
      margin: 0,
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f0f4f8',
      boxSizing: 'border-box',
    },
    container: {
      width: '100%',
      maxWidth: '400px',
      padding: '30px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
      textAlign: 'center',
      transition: 'transform 0.2s',
    },
    heading: {
      fontSize: '1.6rem',
      marginBottom: '25px',
      fontWeight: 'bold',
      color: '#111827',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    label: {
      textAlign: 'left',
      fontWeight: 500,
      marginBottom: '5px',
      color: '#374151',
      fontSize: '0.95rem',
    },
    input: {
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '16px',
      width: '100%',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    inputFocus: {
      borderColor: '#4f46e5',
      boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)',
      outline: 'none',
    },
    button: {
      padding: '12px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#4f46e5',
      cursor: 'pointer',
      transition: 'background-color 0.2s, transform 0.1s',
    },
    buttonDisabled: {
      backgroundColor: '#a5b4fc',
      cursor: 'not-allowed',
    },
    message: {
      marginTop: '20px',
      padding: '14px',
      borderRadius: '8px',
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: '0.95rem',
    },
    success: {
      backgroundColor: '#d1fae5',
      color: '#15803d',
    },
    error: {
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Verifikasi Kode Voucher 🎁</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="voucherCode" style={styles.label}>Masukkan Kode Voucher</label>
          <input
            type="text"
            id="voucherCode"
            value={voucherCode}
            onChange={handleInputChange}
            placeholder="Contoh: DISKON10"
            disabled={isLoading}
            style={styles.input}
            onFocus={e => e.target.style = {...styles.input, ...styles.inputFocus}}
            onBlur={e => e.target.style = {...styles.input}}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{...styles.button, ...(isLoading ? styles.buttonDisabled : {})}}
          >
            {isLoading ? 'Memverifikasi...' : 'Gunakan Voucher'}
          </button>
        </form>
        {message && (
          <div style={{...styles.message, ...(message.type === 'success' ? styles.success : styles.error)}}>
            <p>{message.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
