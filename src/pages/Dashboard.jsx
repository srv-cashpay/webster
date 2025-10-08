import Header from "../components/Header";
import Card from "../components/Card";
import Chart from "../components/Chart";

const Dashboard = ({ onLogout }) => {
  return (
    <div className="dashboard">
      <Header onLogout={onLogout} />
      <div className="card-container">
        <Card title="Users" value="1,200" />
        <Card title="Sales" value="$32,000" />
        <Card title="Orders" value="320" />
      </div>
      <Chart />
    </div>
  );
};

export default Dashboard;
