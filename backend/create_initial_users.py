from passlib.hash import bcrypt
from database import supabase

default_users = [
    ("admin@example.com", "admin123", "admin"),
    ("staff1@example.com", "staff123", "staff"),
    ("staff2@example.com", "staff123", "staff"),
    ("staff3@example.com", "staff123", "staff"),
]

for email, password, role in default_users:
    hashed = bcrypt.hash(password)
    supabase.table("users").insert({
        "email": email,
        "password_hash": hashed,
        "role": role
    }).execute()

print("Default admin + 3 staff created successfully.")
