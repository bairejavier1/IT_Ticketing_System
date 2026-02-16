import React, { useEffect, useState } from "react";
import { api } from "../api";
import TicketForm from "../components/TicketForm";
import TicketTable from "../components/TicketTable";

export default function UserDashboard() {
  const [tickets, setTickets] = useState([]);

  const load = async () => {
    const res = await api.get("/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const createTicket = async (data) => {
    await api.post("/tickets", data);
    load();
  };

  const updateTicket = async (id, data) => {
    await api.patch(`/tickets/${id}`, data);
    load();
  };

  return (
    <>
      <div className="cards-grid">
        <div className="card">
          <div className="card-title">Create a new ticket</div>
          <div className="card-subtitle">
            Describe your issue so IT can help you faster.
          </div>
          <TicketForm onCreate={createTicket} />
        </div>

        <div className="card">
          <div className="card-title">Quick stats</div>
          <div className="card-subtitle">
            A quick glance at your open requests.
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
        <div className="card-title">My tickets</div>
        <div className="card-subtitle">
          Track the status and responses from IT.
        </div>
        <TicketTable tickets={tickets} role="user" onUpdate={updateTicket} />
      </div>
    </>
  );
}
