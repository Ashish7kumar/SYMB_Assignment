import "./OrdersList.css";

export default function OrdersList({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="card">
        <h2 className="card-title"><span className="icon">📦</span> All Orders</h2>
        <div className="empty-state">No orders yet. Add your first order above!</div>
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
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td className="order-id">{order.orderId}</td>
                <td className="restaurant">{order.restaurantName}</td>
                <td className="center">{order.itemCount}</td>
                <td className="center">{order.deliveryDistance} km</td>
                <td className="center">
                  <span className={`status-pill ${order.isPaid ? "paid" : "unpaid"}`}>
                    {order.isPaid ? "✓ Paid" : "⏳ Unpaid"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}