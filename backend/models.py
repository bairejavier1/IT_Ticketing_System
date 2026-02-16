"""
Supabase tables required:

Table: users
- id: uuid (primary key)
- email: text (unique)
- password_hash: text
- role: text ('admin', 'staff', 'user')

Table: tickets
- id: bigint (primary key)
- title: text
- description: text
- status: text ('New', 'Open', 'In Progress', 'Resolved')
- priority: text ('Low', 'Medium', 'High')
- created_by: uuid
- assigned_to: uuid (nullable)

Table: comments
- id: bigint
- ticket_id: bigint
- author_id: uuid
- comment: text
"""
