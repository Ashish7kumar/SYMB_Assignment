import "./OrdersList.css";

export default function OrdersList({ orders, onMarkCompleted }) {
  if (orders.length === 0) {
    return (
      <div className="card">
        <h2 className="card-title"><span className="icon">📦</span> All Orders</h2>
        <div className="empty-state">No orders found.</div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">
        <span className="icon">📦</span> All Orders
        <span className="badge">{orders.length}</span>
      </h2>
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Restaurant</th>
              <th>Items</th>
              <th>Distance</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className={order.isCompleted ? "row-completed" : ""}>
                <td className="order-id">{order.orderId}</td>
                <td className="restaurant">
                  {order.isCompleted
                    ? <span className="done-strike">{order.restaurantName}</span>
                    : order.restaurantName}
                </td>
                <td className="center">{order.itemCount}</td>
                <td className="center">{order.deliveryDistance} km</td>
                <td className="center">
                  {order.isCompleted ? (
                    <span className="status-pill completed">🎉 Completed</span>
                  ) : (
                    <span className={`status-pill ${order.isPaid ? "paid" : "unpaid"}`}>
                      {order.isPaid ? "✓ Paid" : "⏳ Unpaid"}
                    </span>
                  )}
                </td>
                <td className="center">
                  {order.isCompleted ? (
                    <span className="done-label">✓ Done</span>
                  ) : (
                    <button
                      className="btn-complete"
                      onClick={() => onMarkCompleted(order.orderId)}
                    >
                      Mark Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}