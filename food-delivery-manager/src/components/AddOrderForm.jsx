import { useState } from "react";
import { createPortal } from "react-dom";
import { generateOrderId } from "../utils/orderLogic";
import "./AddOrderForm.css";


function ErrorModal({ errors, onClose }) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-icon">⚠️</span>
          <h3>Please fix the following errors</h3>
        </div>
        <ul className="modal-error-list">
          {errors.map((err, i) => (
            <li key={i}>
              <span className="modal-bullet">✖</span> {err}
            </li>
          ))}
        </ul>
        <button className="modal-close-btn" onClick={onClose}>
          Got it, fix errors
        </button>
      </div>
    </div>,
    document.body
  );
}


function SuccessToast({ name }) {
  return createPortal(
    <div className="toast-success">
      ✅ Order from <strong>{name}</strong> added successfully!
    </div>,
    document.body
  );
}


export default function AddOrderForm({ onAddOrder }) {
  const [form, setForm] = useState({
    restaurantName: "",
    itemCount: "",
    isPaid: false,
    deliveryDistance: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [modalErrors, setModalErrors] = useState([]);
  const [showModal, setShowModal]     = useState(false);
  const [showToast, setShowToast]     = useState(false);
  const [toastName, setToastName]     = useState("");
  const [touched, setTouched]         = useState({});


  const validate = (f) => {
    const fieldErrs = {};
    const modalList = [];

    if (!f.restaurantName.trim()) {
      fieldErrs.restaurantName = "Restaurant name is required.";
      modalList.push("Restaurant name cannot be empty.");
    } else if (f.restaurantName.trim().length < 2) {
      fieldErrs.restaurantName = "Name must be at least 2 characters.";
      modalList.push("Restaurant name is too short (min 2 chars).");
    }

    if (f.itemCount === "") {
      fieldErrs.itemCount = "Item count is required.";
      modalList.push("Number of items is required.");
    } else if (parseFloat(f.itemCount) < 0) {
      fieldErrs.itemCount = "Value cannot be negative.";
      modalList.push("Number of items cannot be negative.");
    } else if (parseInt(f.itemCount) === 0) {
      fieldErrs.itemCount = "Must have at least 1 item.";
      modalList.push("Number of items must be at least 1.");
    } else if (!Number.isInteger(parseFloat(f.itemCount))) {
      fieldErrs.itemCount = "Must be a whole number.";
      modalList.push("Item count must be a whole number (no decimals).");
    }

    if (f.deliveryDistance === "") {
      fieldErrs.deliveryDistance = "Delivery distance is required.";
      modalList.push("Delivery distance is required.");
    } else if (parseFloat(f.deliveryDistance) < 0) {
      fieldErrs.deliveryDistance = "Distance cannot be negative.";
      modalList.push("Delivery distance cannot be negative.");
    } else if (parseFloat(f.deliveryDistance) === 0) {
      fieldErrs.deliveryDistance = "Distance must be greater than 0.";
      modalList.push("Delivery distance must be greater than 0 km.");
    } else if (parseFloat(f.deliveryDistance) > 9999) {
      fieldErrs.deliveryDistance = "Max distance is 9999 km.";
      modalList.push("Delivery distance exceeds maximum limit of 9999 km.");
    }

    return { fieldErrs, modalList };
  };

 
  const handleSubmit = () => {
    setTouched({ restaurantName: true, itemCount: true, deliveryDistance: true });
    const { fieldErrs, modalList } = validate(form);

    if (modalList.length > 0) {
      setFieldErrors(fieldErrs);
      setModalErrors(modalList);
      setShowModal(true);
      return;
    }

    const newOrder = {
      orderId: generateOrderId(),
      restaurantName: form.restaurantName.trim(),
      itemCount: parseInt(form.itemCount),
      isPaid: form.isPaid,
      deliveryDistance: parseFloat(form.deliveryDistance),
    };

    const name = form.restaurantName.trim();
    onAddOrder(newOrder);
    setForm({ restaurantName: "", itemCount: "", isPaid: false, deliveryDistance: "" });
    setFieldErrors({});
    setTouched({});
    setToastName(name);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2800);
  };

 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updated = { ...form, [name]: type === "checkbox" ? checked : value };
    setForm(updated);
    if (touched[name]) {
      const { fieldErrs } = validate(updated);
      setFieldErrors((prev) => ({ ...prev, [name]: fieldErrs[name] || "" }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const { fieldErrs } = validate(form);
    setFieldErrors((prev) => ({ ...prev, [name]: fieldErrs[name] || "" }));
  };

  return (
    <>
      {showModal && (
        <ErrorModal errors={modalErrors} onClose={() => setShowModal(false)} />
      )}
      {showToast && <SuccessToast name={toastName} />}

      <div className="card">
        <h2 className="card-title">
          <span className="icon">🛒</span> Add New Order
        </h2>

        <div className="form-grid">
          <div className={`form-group ${touched.restaurantName && fieldErrors.restaurantName ? "has-error" : ""}`}>
            <label>Restaurant Name <span className="required">*</span></label>
            <input
              name="restaurantName"
              value={form.restaurantName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Pizza Palace"
            />
            {touched.restaurantName && fieldErrors.restaurantName && (
              <span className="error-msg">⚠ {fieldErrors.restaurantName}</span>
            )}
          </div>

          <div className={`form-group ${touched.itemCount && fieldErrors.itemCount ? "has-error" : ""}`}>
            <label>Number of Items <span className="required">*</span></label>
            <input
              type="number"
              name="itemCount"
              value={form.itemCount}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. 3"
              min="1"
            />
            {touched.itemCount && fieldErrors.itemCount && (
              <span className="error-msg">⚠ {fieldErrors.itemCount}</span>
            )}
          </div>

          <div className={`form-group ${touched.deliveryDistance && fieldErrors.deliveryDistance ? "has-error" : ""}`}>
            <label>Delivery Distance (km) <span className="required">*</span></label>
            <input
              type="number"
              name="deliveryDistance"
              value={form.deliveryDistance}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. 5.2"
              min="0.1"
              step="0.1"
            />
            {touched.deliveryDistance && fieldErrors.deliveryDistance && (
              <span className="error-msg">⚠ {fieldErrors.deliveryDistance}</span>
            )}
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
    </>
  );
}