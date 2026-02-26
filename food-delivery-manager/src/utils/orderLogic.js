export const generateOrderId = () => {
  return "ORD-" + Math.random().toString(36).substr(2, 6).toUpperCase();
};

export const filterOrders = (orders, { status, maxDistance }) => {
  return orders.filter((order) => {
    const statusMatch =
      status === "all" ||
      (status === "paid" && order.isPaid) ||
      (status === "unpaid" && !order.isPaid);

    const distanceMatch =
      maxDistance === "" || order.deliveryDistance <= parseFloat(maxDistance);

    return statusMatch && distanceMatch;
  });
};

export const assignDelivery = (orders, maxDistance) => {
  const max = parseFloat(maxDistance);
  if (isNaN(max) || max <= 0) return { order: null, error: "Enter a valid max distance." };

  const eligible = orders.filter(
    (o) => !o.isCompleted && o.deliveryDistance <= max
  );

  if (eligible.length === 0) return { order: null, error: "No order available" };

  const nearest = eligible.reduce((prev, curr) =>
    curr.deliveryDistance < prev.deliveryDistance ? curr : prev
  );

  return { order: nearest, error: null };
};