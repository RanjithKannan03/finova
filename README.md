# Finova

**Finova** is a web platform for apartment residents to streamline shared spending and budget management. It allows flatmates to record shared expenses, view financial analytics, monitor remaining budget, and make financial decisions through a democratic voting system.

- 🔗 **Live App**: [finova-frontend.vercel.app](https://finova-frontend.vercel.app)

There are two directories — `frontend` and `backend`.

- **Frontend** is a Next.js app made with [Bun](https://bun.sh/)
- **Backend** is a Django app made with [uv](https://docs.astral.sh/uv/)

---

## Frontend

Navigate to the `frontend` folder:

```bash
cd frontend
```

Install the required packages:

```bash
bun i
```

Create a `.env.local` file in the `frontend` directory:

```dotenv
BACKEND_URL=http://127.0.0.1:8000
ENV=local
```

Run the development server:

```bash
bun dev
```

### Frontend Tech Stack

- **Next.js** with route groups `(auth)`, `(dashboard)`, `(no-flat)` for conditional rendering based on authentication state
- **React** with `<Suspense>` boundaries and skeleton loaders for optimised loading
- **Zustand** for global client-side state management
- **Tailwind CSS** for responsive styling across mobile, tablet, and desktop
- **Recharts** for interactive financial charts and data visualisations
- **GSAP** for smooth page transitions and micro-interactions
- Next.js **Server Actions** for form submission and data mutation

---

## Backend

Navigate to the `backend` folder:

```bash
cd backend && cd finova
```

Sync dependencies:

```bash
uv sync
```

Run the development server:

```bash
python manage.py migrate && python manage.py runserver
```

### Backend Tech Stack

- **Django** + **Django REST Framework**
- **SimpleJWT** with a custom `CookieJWTAuthentication` class — tokens are stored as `HttpOnly` cookies (`access_token`, `refresh_token`) rather than in local storage, preventing XSS attacks
- **Token blacklisting** on logout
- **UUID primary keys** on all models (User, Flat, Budget, Request, etc.) to prevent IDOR vulnerabilities

---

## Features

- **Authentication** — Secure register/login using JWT stored in HttpOnly cookies
- **Flat management** — Create or join a flat via a randomly generated 4-character join code
- **Expense tracking** — Add shared expenses with category, amount, and payer details; supports Groceries, Cleaning Supplies, and Home Essentials
- **Budget monitoring** — View monthly budget, total spending, and remaining balance
- **Analytics** — Visual graphs (line charts, donut charts) of expenses by category and over time
- **Voting system** — Propose and vote on budget changes or shared purchases; requests are finalised based on majority vote

---

## Database Models

| Model           | Key Fields                                                                   |
| --------------- | ---------------------------------------------------------------------------- |
| User            | `user_id` (UUID), `name`, `email`, `role`                                    |
| Flat            | `flat_id` (UUID), `name`, `join_code`, `max_members`                         |
| Flat Membership | `membership_id`, `flat_id`, `user_id`, `joined_on`, `is_active`              |
| Expenses        | `expense_id`, `flat_id`, `user_id`, `amount`, `category`, `items` (JSON)     |
| Monthly Budget  | `budget_id`, `flat_id`, `month`, `year`, `amount`                            |
| Request         | `request_id`, `flat_id`, `user_id`, `title`, `description`, `type`, `status` |
| Vote            | `vote_id`, `request_id`, `user_id`, `vote` (bool)                            |

---

## Pages

| Route                   | Description                                                                |
| ----------------------- | -------------------------------------------------------------------------- |
| `/login`                | Landing / login page                                                       |
| `/register`             | Register a new account                                                     |
| `/flat-action`          | Create or join a flat                                                      |
| `/home`                 | Dashboard — recent transactions, flat info, budget split, pending requests |
| `/add`                  | Add a new shared expense                                                   |
| `/analytics`            | Expense charts filtered by type, date range, and user                      |
| `/requests`             | List and manage flatmate requests                                          |
| `/requests/new-request` | Submit a new general or budget-change request                              |
| `/404`                  | Not found error page                                                       |
| `/500`                  | Server error page                                                          |
