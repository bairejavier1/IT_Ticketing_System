## 🧩 System Deeper Architecture Explanation for non-technical users

1. The React frontend sends a request to the backend (FastAPI), think of the frontend as the part the user sees (the buttons, forms, tables, and dashboards).

When a user does something like:

-> Log in
-> Create a ticket
-> Update a ticket
-> View their dashboard

…the frontend uses Axios (a tool for sending web requests) to send a message to the backend.

> Example: “Hey backend, the user wants to log in. Here is their email and password.” This message is sent over HTTP, just like how websites communicate with servers.

2. The FastAPI backend receives the request and processes it. The backend is the brain of the application. When it receives a request, it:

-> Validates the data (using Pydantic)
-> Checks authentication (session cookie)
-> Applies business logic (e.g., “only admins can assign tickets”)
-> Prepares a database query

> Example: “Let me check if this email exists, verify the password, and then create a session.” The backend never trusts the frontend, it always double‑checks everything.

3. The backend communicates with Supabase (PostgreSQL). The backend uses the Supabase Python Client to talk to the database.

This is important:

✔️ The backend does NOT use Axios
✔️ The backend does NOT use fetch
✔️ The backend does NOT expose database credentials to the frontend, instead, it uses: 

> supabase.table("tickets").insert({...}).execute()

Supabase handles:

-> Running SQL queries
-> Talking to PostgreSQL
-> Returning results

The backend simply asks: “Database, please insert this ticket.”

4. The database returns data to the backend (as JSON). Supabase sits on top of PostgreSQL and exposes a REST API layer (PostgREST). This means:

-> The database returns results in JSON format

> Example:

json
{
  "id": 42,
  "title": "Printer not working",
  "status": "New"
}

-> The Supabase Python client converts that JSON into Python dictionaries

> Example:

Python dictionary is an in-memory Python object you can interact with directly:

ticket_title = res.data[0]["title"]  # "Laptop not turning on"
ticket_status = res.data[0]["status"]  # "New"


The backend now has the final data it needs.

5. The backend returns structured JSON to the frontend. Once the backend receives the database response, it:

-> Formats the data
-> Applies any final logic
-> Sends a clean JSON response back to the frontend

> Example: “Here is the new ticket you created, including its ID and status.”
The frontend receives this JSON and updates the UI accordingly.

---

This separation ensures:
- Secure credential handling
- Clean separation of concerns
- Scalable architecture
- Clear API boundaries

---

