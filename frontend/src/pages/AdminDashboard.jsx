import React, { useEffect, useState } from "react";
import { api } from "../api";
import TicketTable from "../components/TicketTable";

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);

  const load = async () => {
    const res = await api.get("/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateTicket = async (id, data) => {
    await api.patch(`/tickets/${id}`, data);
    load();
  };

  return (
    <>
      <div className="cards-grid">
        <div className="card">
          <div className="card-title">All tickets</div>
          <div className="card-subtitle">
            High-level view across the entire organization.
          </div>
          <div style={{ fontSize: 13, marginTop: 6 }}>
            <div>Total tickets: {tickets.length}</div>
            <div>
              Open: {tickets.filter((t) => t.status !== "Resolved").length}
            </div>
            <div>
              Resolved: {tickets.filter((t) => t.status === "Resolved").length}
            </div>
          </div>
        </div>
      </div>

      <div className="card table-card">
        <div className="card-title">All tickets</div>
        <div className="card-subtitle">
          Assign tickets, adjust priorities, and monitor progress.
        </div>
        <TicketTable tickets={tickets} role="admin" onUpdate={updateTicket} />
      </div>
    </>
  );
}
