import { useState } from "react";
import { generateOrderId } from "../utils/orderLogic";
import "./AddOrderForm.css";

export default function AddOrderForm({ onAddOrder }) {
  const [form, setForm] = useState({
    restaurantName: "",
    itemCount: "",
    isPaid: false,
    deliveryDistance: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.restaurantName.trim()) e.restaurantName = "Restaurant name is required.";
    if (!form.itemCount || form.itemCount <= 0) e.itemCount = "Item count must be > 0.";
    if (!form.deliveryDistance || form.deliveryDistance <= 0)
      e.deliveryDistance = "Distance must be > 0.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) return setErrors(e);

    const newOrder = {
      orderId: generateOrderId(),
      restaurantName: form.restaurantName.trim(),
      itemCount: parseInt(form.itemCount),
      isPaid: form.isPaid,
      deliveryDistance: parseFloat(form.deliveryDistance),
    };

    onAddOrder(newOrder);
    setForm({ restaurantName: "", itemCount: "", isPaid: false, deliveryDistance: "" });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="card">
      <h2 className="card-title">
        <span className="icon">🛒</span> Add New Order
      </h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Restaurant Name</label>
          <input
            name="restaurantName"
            value={form.restaurantName}
            onChange={handleChange}
            placeholder="e.g. Pizza Palace"
          />
          {errors.restaurantName && <span className="error">{errors.restaurantName}</span>}
        </div>

        <div className="form-group">
          <label>Number of Items</label>
          <input
            type="number"
            name="itemCount"
            value={form.itemCount}
            onChange={handleChange}
            placeholder="e.g. 3"
            min="1"
          />
          {errors.itemCount && <span className="error">{errors.itemCount}</span>}
        </div>

        <div className="form-group">
          <label>Delivery Distance (km)</label>
          <input
            type="number"
            name="deliveryDistance"
            value={form.deliveryDistance}
            onChange={handleChange}
            placeholder="e.g. 5.2"
            min="0.1"
            step="0.1"
          />
          {errors.deliveryDistance && <span className="error">{errors.deliveryDistance}</span>}
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isPaid"
              checked={form.isPaid}
              onChange={handleChange}
            />
            <span>Mark as Paid</span>
          </label>
        </div>
      </div>

      <button className="btn-primary" onClick={handleSubmit}>
        + Add Order
      </button>
    </div>
  );
}