import { useState, useMemo } from "react";
import AddOrderForm from "./components/AddOrderForm";
import OrdersList from "./components/OrdersList";
import FilterPanel from "./components/FilterPanel";
import AssignDelivery from "./components/AssignDelivery";
import { filterOrders } from "./utils/orderLogic";
import "./App.css";

const SAMPLE_ORDERS = [
  { orderId: "ORD-A1B2C3", restaurantName: "Pizza Palace", itemCount: 3, isPaid: false, deliveryDistance: 4.5 },
  { orderId: "ORD-D4E5F6", restaurantName: "Burger Barn", itemCount: 2, isPaid: true, deliveryDistance: 2.1 },
  { orderId: "ORD-G7H8I9", restaurantName: "Sushi Stop", itemCount: 5, isPaid: false, deliveryDistance: 7.8 },
];

export default function App() {
  const [orders, setOrders] = useState(SAMPLE_ORDERS);
  const [filters, setFilters] = useState({ status: "all", maxDistance: "" });
  const [activeTab, setActiveTab] = useState("orders");

  const handleAddOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const filteredOrders = useMemo(() => filterOrders(orders, filters), [orders, filters]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">🍔</span>
            <div>
              <div className="logo-title">DeliveryManager</div>
              <div className="logo-sub">Food Order Control Panel</div>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-num">{orders.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat">
              <span className="stat-num">{orders.filter(o => !o.isPaid).length}</span>
              <span className="stat-label">Unpaid</span>
            </div>
            <div className="stat">
              <span className="stat-num">{orders.filter(o => o.isPaid).length}</span>
              <span className="stat-label">Paid</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        
        <AddOrderForm onAddOrder={handleAddOrder} />

      
        <div className="tabs">
          <button
            className={`tab ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            📦 View Orders
          </button>
          <button
            className={`tab ${activeTab === "filter" ? "active" : ""}`}
            onClick={() => setActiveTab("filter")}
          >
            
          </button>
        </div>

        {activeTab === "orders" && (
          <OrdersList orders={orders} />
        )}

        {activeTab === "filter" && (
          <>
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              filteredCount={filteredOrders.length}
            />
            <OrdersList orders={filteredOrders} />
            <AssignDelivery orders={orders} />
          </>
        )}
      </main>
    </div>
  );
}
