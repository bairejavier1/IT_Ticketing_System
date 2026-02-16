import React, { useState } from "react";

export default function TicketForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onCreate({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="ticket-form" onSubmit={submit}>
      <div>
        <div className="field-label">Title</div>
        <input
          className="input"
          placeholder="Short summary of the issue"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <div className="field-label">Description</div>
        <textarea
          className="input"
          placeholder="Describe what’s happening, any error messages, and steps to reproduce."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button className="btn-primary" style={{ width: "fit-content" }}>
        Create ticket
      </button>
    </form>
  );
}
