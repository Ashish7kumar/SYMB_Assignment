import "./FilterPanel.css";

export default function FilterPanel({ filters, onFilterChange, filteredCount }) {
  return (
    <div className="card filter-card">
      <h2 className="card-title"><span className="icon">🔍</span> Filter Orders</h2>
      <div className="filter-row">
        <div className="filter-group">
          <label>Payment Status</label>
          <div className="radio-group">
            {["all", "paid", "unpaid"].map((s) => (
              <label key={s} className={`radio-btn ${filters.status === s ? "active" : ""}`}>
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={filters.status === s}
                  onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Max Distance (km)</label>
          <input
            type="number"
            value={filters.maxDistance}
            min="0"
            step="0.1"
            placeholder="Any distance"
            onChange={(e) => onFilterChange({ ...filters, maxDistance: e.target.value })}
          />
        </div>

        <div className="filter-group center-align">
          <button
            className="btn-outline"
            onClick={() => onFilterChange({ status: "all", maxDistance: "" })}
          >
            Reset Filters
          </button>
          <div className="result-count">
            Showing <strong>{filteredCount}</strong> order{filteredCount !== 1 ? "s" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}