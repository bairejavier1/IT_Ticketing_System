import React, { useEffect, useState } from "react";
import { api } from "../api";
import TicketTable from "../components/TicketTable";

export default function StaffDashboard() {
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
          <div className="card-title">Assigned tickets</div>
          <div className="card-subtitle">
            Work through your queue and keep users unblocked.
          </div>
          <div style={{ fontSize: 13, marginTop: 6 }}>
            <div>Total assigned: {tickets.length}</div>
            <div>
              In progress:{" "}
              {tickets.filter((t) => t.status === "In Progress").length}
            </div>
            <div>
              Resolved: {tickets.filter((t) => t.status === "Resolved").length}
            </div>
          </div>
        </div>
      </div>

      <div className="card table-card">
        <div className="card-title">Ticket queue</div>
        <div className="card-subtitle">
          Update statuses and leave comments as you work.
        </div>
        <TicketTable tickets={tickets} role="staff" onUpdate={updateTicket} />
      </div>
    </>
  );
}
