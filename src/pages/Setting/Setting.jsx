const handleLogout = async () => {
  setLoadingLogout(true);

  try {
    const token = Cookies.get("token");

    if (token) {
      await axios.post(
        "https://api.cashpay.co.id/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    }

    // 🔥 HAPUS COOKIE DENGAN DOMAIN YANG BENAR
    Cookies.remove("token", { domain: ".cashpay.co.id" });
    Cookies.remove("refresh_token", { domain: ".cashpay.co.id" });

    localStorage.removeItem("token");

    toast.success("Logout successful!", { autoClose: 1200 });

    // 🔥 REDIRECT FIX (JANGAN PAKE ENV YANG BELUM PASTI)
    setTimeout(() => {
      window.location.replace("https://cashpay.co.id");
    }, 1200);

  } catch (error) {
    console.error("Logout failed:", error);
    toast.error("Logout failed");
  } finally {
    setLoadingLogout(false);
  }
};
