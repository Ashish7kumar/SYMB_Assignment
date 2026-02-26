import { useState, useMemo } from "react";
import LandingPage from "./components/LandingPage";
import AddOrderForm from "./components/AddOrderForm";
import OrdersList from "./components/OrdersList.jsx";
import FilterPanel from "./components/Temp.jsx";
import AssignDelivery from "./components/AssignDelivery.jsx";
import { filterOrders } from "./utils/orderLogic";
import "./App.css";

const SAMPLE_ORDERS = [
  { orderId: "ORD-A1B2C3", restaurantName: "Pizza Palace",  itemCount: 3, isPaid: false, deliveryDistance: 4.5, isCompleted: false },
  { orderId: "ORD-D4E5F6", restaurantName: "Burger Barn",   itemCount: 2, isPaid: true,  deliveryDistance: 2.1, isCompleted: false },
  { orderId: "ORD-G7H8I9", restaurantName: "Sushi Stop",    itemCount: 5, isPaid: false, deliveryDistance: 7.8, isCompleted: false },
];

export default function App() {
  const [page, setPage]       = useState("landing"); // "landing" | "dashboard"
  const [orders, setOrders]   = useState(SAMPLE_ORDERS);
  const [filters, setFilters] = useState({ status: "all", maxDistance: "" });
  const [activeTab, setActiveTab] = useState("orders");

  const handleAddOrder      = (order)   => setOrders((p) => [{ ...order, isCompleted: false }, ...p]);
  const handleMarkCompleted = (orderId) =>
    setOrders((p) => p.map((o) => o.orderId === orderId ? { ...o, isCompleted: true, isPaid: true } : o));

  const filteredOrders = useMemo(() => filterOrders(orders, filters), [orders, filters]);

  if (page === "landing") {
    return <LandingPage onEnter={() => setPage("dashboard")} />;
  }


  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <button className="back-btn" onClick={() => setPage("landing")} title="Back to Home">
              ←
            </button>
            <span className="logo-icon">🍔</span>
            <div>
              <div className="logo-title">DeliveryOS</div>
              <div className="logo-sub">Order Control Panel</div>
            </div>
          </div>

          <div className="header-stats">
            <div className="stat">
              <span className="stat-num">{orders.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat">
              <span className="stat-num">{orders.filter(o => !o.isPaid && !o.isCompleted).length}</span>
              <span className="stat-label">Unpaid</span>
            </div>
            <div className="stat">
              <span className="stat-num">{orders.filter(o => o.isPaid && !o.isCompleted).length}</span>
              <span className="stat-label">Paid</span>
            </div>
            <div className="stat">
              <span className="stat-num completed-num">{orders.filter(o => o.isCompleted).length}</span>
              <span className="stat-label">Done</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <AddOrderForm onAddOrder={handleAddOrder} />

        <div className="tabs">
          <button className={`tab ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}>
            📦 View Orders
          </button>
          <button className={`tab ${activeTab === "filter" ? "active" : ""}`} onClick={() => setActiveTab("filter")}>
            🔍 Filter & Assign
          </button>
        </div>

        {activeTab === "orders" && (
          <OrdersList orders={orders} onMarkCompleted={handleMarkCompleted} />
        )}

        {activeTab === "filter" && (
          <>
            <FilterPanel filters={filters} onFilterChange={setFilters} filteredCount={filteredOrders.length} />
            <OrdersList orders={filteredOrders} onMarkCompleted={handleMarkCompleted} />
            <AssignDelivery orders={orders} />
          </>
        )}
      </main>
    </div>
  );
}