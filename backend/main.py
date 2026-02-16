from fastapi import FastAPI, HTTPException, Depends, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from passlib.hash import bcrypt
from .database import supabase
from .schemas import LoginRequest, RegisterRequest, TicketCreate, TicketUpdate
from typing import Optional
import uuid

app = FastAPI()

# Simple in-memory session store for dev
sessions: dict[str, int] = {}

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_current_user(request: Request):
    session_id: Optional[str] = request.cookies.get("session_id")
    if not session_id or session_id not in sessions:
        raise HTTPException(status_code=401, detail="Not authenticated")

    user_id = sessions[session_id]
    res = (
        supabase.table("users")
        .select("id, email, role")
        .eq("id", user_id)
        .single()
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=401, detail="User not found")

    return res.data


@app.post("/register")
def register(data: RegisterRequest):
    existing = (
        supabase.table("users")
        .select("id")
        .eq("email", data.email)
        .execute()
        .data
    )
    if existing:
        raise HTTPException(400, "Email already registered")

    hashed = bcrypt.hash(data.password)

    user = (
        supabase.table("users")
        .insert(
            {
                "email": data.email,
                "password_hash": hashed,
                "role": "user",
            }
        )
        .execute()
        .data[0]
    )

    return {"id": user["id"], "email": user["email"], "role": user["role"]}


@app.post("/login")
def login(data: LoginRequest, response: Response):
    res = (
        supabase.table("users")
        .select("id, email, role, password_hash")
        .eq("email", data.email)
        .single()
        .execute()
    )

    user = res.data
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not bcrypt.verify(data.password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    session_id = str(uuid.uuid4())
    sessions[session_id] = user["id"]

    response.set_cookie(
        key="session_id",
        value=session_id,
        httponly=True,
        samesite="lax",
    )

    return {"id": user["id"], "email": user["email"], "role": user["role"]}


@app.get("/me")
def me(current_user=Depends(get_current_user)):
    return current_user


@app.post("/logout")
def logout(response: Response, request: Request):
    session_id = request.cookies.get("session_id")
    if session_id and session_id in sessions:
        del sessions[session_id]
    response.delete_cookie("session_id")
    return {"detail": "Logged out"}


@app.get("/tickets")
def list_tickets(current_user=Depends(get_current_user)):
    res = (
        supabase.table("tickets")
        .select("id, title, description, status, priority, assigned_to")
        .order("id", desc=True)
        .execute()
    )
    return res.data or []


@app.post("/tickets")
def create_ticket(data: TicketCreate, current_user=Depends(get_current_user)):
    ticket = (
        supabase.table("tickets")
        .insert(
            {
                "title": data.title,
                "description": data.description,
                "status": "New",
                "priority": "Medium",
                "created_by": current_user["id"],
            }
        )
        .execute()
        .data[0]
    )
    return ticket


@app.patch("/tickets/{ticket_id}")
def update_ticket(ticket_id: int, data: TicketUpdate, current_user=Depends(get_current_user)):
    update_data = {}

    if data.status is not None:
        update_data["status"] = data.status
    if data.priority is not None:
        update_data["priority"] = data.priority
    if data.assigned_to is not None:
        update_data["assigned_to"] = data.assigned_to

    if update_data:
        supabase.table("tickets").update(update_data).eq("id", ticket_id).execute()

    if data.comment:
        supabase.table("comments").insert(
            {
                "ticket_id": ticket_id,
                "user_id": current_user["id"],
                "content": data.comment,
            }
        ).execute()

    res = (
        supabase.table("tickets")
        .select("id, title, description, status, priority, assigned_to")
        .eq("id", ticket_id)
        .single()
        .execute()
    )
    return res.data
