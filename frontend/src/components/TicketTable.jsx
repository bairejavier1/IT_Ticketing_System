import React, { useState } from "react";

export default function TicketTable({ tickets, role, onUpdate }) {
  return (
    <table className="tickets-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Assigned To</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tickets.map((t) => (
          <TicketRow key={t.id} ticket={t} role={role} onUpdate={onUpdate} />
        ))}
      </tbody>
    </table>
  );
}

function TicketRow({ ticket, role, onUpdate }) {
  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);
  const [assignedTo, setAssignedTo] = useState(ticket.assigned_to || "");
  const [comment, setComment] = useState("");

  const save = () => {
    onUpdate(ticket.id, {
      status,
      priority,
      assigned_to: assignedTo || null,
      comment,
    });
    setComment("");
  };

  return (
    <tr>
      <td>{ticket.id}</td>
      <td>{ticket.title}</td>

      <td>
        {role !== "user" ? (
          <select
            className="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>New</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        ) : (
          ticket.status
        )}
      </td>

      <td>
        {role === "admin" ? (
          <select
            className="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        ) : (
          ticket.priority
        )}
      </td>

      <td>
        {role === "admin" ? (
          <input
            className="small-input"
            placeholder="user id or email"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        ) : (
          ticket.assigned_to || "Unassigned"
        )}
      </td>

      <td>
        <input
          className="small-input"
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="btn-small" onClick={save}>
          Save
        </button>
      </td>
    </tr>
  );
}
