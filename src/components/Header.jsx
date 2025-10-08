const Header = ({ onLogout }) => {
  return (
    <div className="header">
      <h2>Welcome Back, User!</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Header;
