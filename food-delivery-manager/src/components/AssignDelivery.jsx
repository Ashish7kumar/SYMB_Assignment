import { useState } from "react";
import { assignDelivery } from "../utils/orderLogic";
import "./AssignDelivery.css";

export default function AssignDelivery({ orders }) {
  const [maxDistance, setMaxDistance] = useState("");
  const [result, setResult] = useState(null);
  const [inputError, setInputError] = useState("");

  const handleAssign = () => {
    if (!maxDistance || parseFloat(maxDistance) <= 0) {
      setInputError("Please enter a valid max distance.");
      setResult(null);
      return;
    }
    setInputError("");
    const { order, error } = assignDelivery(orders, maxDistance);
    setResult({ order, error });
  };

  return (
    <div className="card assign-card">
      <h2 className="card-title"><span className="icon">🚴</span> Assign Delivery</h2>
      <p className="assign-desc">
        Automatically assigns the <strong>nearest unpaid order</strong> within your max distance.
      </p>

      <div className="assign-row">
        <div className="form-group">
          <label>Max Distance (km)</label>
          <input
            type="number"
            value={maxDistance}
            onChange={(e) => { setMaxDistance(e.target.value); setInputError(""); setResult(null); }}
            placeholder="e.g. 10"
            min="0.1"
            step="0.1"
          />
          {inputError && <span className="error">{inputError}</span>}
        </div>
        <button className="btn-assign" onClick={handleAssign}>
          Assign Delivery →
        </button>
      </div>

      {result && (
        <div className={`output-panel ${result.error ? "no-result" : "success"}`}>
          {result.error ? (
            <div className="no-order">
              <span className="no-icon">📭</span>
              <span>{result.error}</span>
            </div>
          ) : (
            <div className="assigned-order">
              <div className="assigned-header">✅ Order Assigned!</div>
              <div className="assigned-grid">
                <div className="assigned-item">
                  <span className="label">Order ID</span>
                  <span className="value mono">{result.order.orderId}</span>
                </div>
                <div className="assigned-item">
                  <span className="label">Restaurant</span>
                  <span className="value">{result.order.restaurantName}</span>
                </div>
                <div className="assigned-item">
                  <span className="label">Items</span>
                  <span className="value">{result.order.itemCount}</span>
                </div>
                <div className="assigned-item">
                  <span className="label">Distance</span>
                  <span className="value highlight">{result.order.deliveryDistance} km</span>
                </div>
                <div className="assigned-item">
                  <span className="label">Payment</span>
                  <span className={`value assigned-status ${result.order.isPaid ? "is-paid" : "is-unpaid"}`}>
                    {result.order.isPaid ? "✓ Paid" : "⏳ Unpaid"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}