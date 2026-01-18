# Intelligent Task Management System with AI

This project is a full‑stack **task management system enhanced with AI-driven natural language commands**. It is designed to demonstrate clean architecture, strong state modeling, and safe AI integration for real-world business logic — with interview‑level clarity and correctness.

---

## 1. Task Model and State Design

### Core Entities

#### **User**

Represents an authenticated individual using the system.

* `id` (PK)
* `name`
* `email` (unique)
* `passwordHash`
* `createdAt`

#### **Project**

Logical container to group tasks.

* `id` (PK)
* `name`
* `description`
* `ownerId` (FK → User.id)
* `createdAt`

#### **Task**

Atomic unit of work.

* `id` (PK)
* `title`
* `description`
* `status` (ENUM)
* `priority` (low | medium | high)
* `dueDate`
* `projectId` (FK → Project.id, nullable)
* `userId` (FK → User.id)
* `createdAt`
* `updatedAt`

### Task State

Task state is explicitly modeled using a **finite set of statuses**:

* `TODO`
* `IN_PROGRESS`
* `COMPLETED`
* `ARCHIVED`

This prevents invalid or ambiguous task states.

---

## 2. State Transition Rules and Validation

### Allowed Transitions

| Current State | Allowed Next States   |
| ------------- | --------------------- |
| NOT_STARTED   | IN_PROGRESS           |
| IN_PROGRESS   | COMPLETED             |
| COMPLETED     | ARCHIVED              |

### Validation Strategy

* All transitions are **validated in the backend**
* Invalid transitions return `400 Bad Request`
* Frontend UI only shows valid next actions (defensive UX)

Example:

* A task cannot move from `COMPLETED → IN_PROGRESS`
* An `ARCHIVED` task is immutable

---

## 3. Database Choice and Schema

### Database: **SQLite (via Sequelize ORM)**

#### Why SQLite?

* Lightweight and file-based
* Perfect for evaluation, interviews, and prototyping
* Zero setup required

#### ORM: Sequelize

Benefits:

* Clear model definitions
* Relationship management
* Easy migration to PostgreSQL/MySQL if scaled

### Relationships

* User **has many** Projects
* Project **has many** Tasks
* User **has many** Tasks (even without a project)

Tasks can exist **independently of projects**, enabling:

* "All Tasks" dashboard
* Personal task tracking

---

## 4. How AI Input Is Processed and Validated

### AI Input Flow

1. User enters natural language command

   > "Create a high priority task to submit report tomorrow"

2. Input is sent to AI service (Gemini)

3. AI converts text → structured JSON intent

Example AI Output:

```json
{
  "action": "CREATE_TASK",
  "title": "Submit report",
  "priority": "high",
  "dueDate": "2026-01-18"
}
```

### Validation Layer (Critical)

AI output is **never trusted directly**.

Backend validates:

* Required fields exist
* Enum values are valid
* Dates are parsable
* User owns referenced project/task

Invalid AI output is rejected safely.

---

## 5. How AI Actions Map to Core Business Logic

AI **does not bypass** business rules.

### Mapping Strategy

| AI Action     | Backend Function     |
| ------------- | -------------------- |
| CREATE_TASK   | `createTask()`       |
| UPDATE_TASK   | `updateTask()`       |
| DELETE_TASK   | `deleteTask()`       |
| COMPLETE_TASK | `updateTaskStatus()` |

All AI-triggered actions:

* Go through the **same controllers** as UI actions
* Enforce authentication, authorization, and validation

AI acts as a **command interface**, not a privileged actor.

---

## 6. Handling Ambiguous or Invalid Commands

### Ambiguous Input

Example:

> "Finish the task"

Issues:

* Which task?
* When?

### Resolution Strategy

1. Backend detects missing identifiers
2. AI responds with clarification prompt

   > "Which task do you want to complete?"
3. No DB mutation occurs until clarified

### Invalid Commands

Example:

> "Delete all tasks of other users"

Handled by:

* Authorization checks
* Safe rejection with explanation

System **fails safely**, never destructively.

---

## 7. Key Architectural Decisions and Trade-offs

### Decision 1: AI as Assistant, Not Authority

**Trade-off:**

* Slightly more code
* Much higher safety and correctness

### Decision 2: Centralized Business Logic

All task rules live in backend services.

**Benefit:**

* UI and AI share identical logic
* No duplicated rules

### Decision 3: Optional Project Context

Tasks can exist with or without a project.

**Benefit:**

* Flexible UX (All Tasks vs Project Tasks)
* Cleaner API design

### Decision 4: REST + JWT Authentication

Chosen for:

* Simplicity
* Stateless scalability
* Industry familiarity

---
