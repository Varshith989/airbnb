# Full-Stack Airbnb Clone

A modern, full-featured Airbnb clone built with Next.js (App Router), TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL (hosted on Supabase), NextAuth.js, and Cloudinary.

![Airbnb Clone Preview](https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80)

---

## 🚀 Features

- **App Router & Server Components:** High performance server-rendered architecture in Next.js 14.
- **Authentication:**
  - Google OAuth & GitHub OAuth integration
  - Credentials authentication (email + bcrypt password hashing)
  - Interactive Register and Login modals with validation (`react-hook-form` + `react-hot-toast`)
- **"Airbnb your home" Listing Creation Wizard:**
  - Category selection (Beach, Windmills, Modern, Pools, Islands, Castles, etc.)
  - Worldwide location picker with country flags (`world-countries`)
  - Numeric stepper counters for Guests, Rooms, and Bathrooms
  - Cloudinary image upload widget with direct photo fallback
  - Pricing and description setup
- **Dynamic Homepage & Browsing:**
  - Server-side filtering based on URL query parameters
  - Horizontal scrollable category bar
  - Multi-step search modal (Destination, Dates, Guests)
- **Reservation & Booking System:**
  - Interactive booking calendar (`react-date-range`)
  - Automatic double-booking prevention with disabled date calculations
  - Live price calculation based on booked nights
- **User Dashboards:**
  - `/trips` — View and cancel your personal guest reservations
  - `/reservations` — Host dashboard to view and manage guest bookings on your properties
  - `/favorites` — Liked listings with instant heart toggle on cards
- **Database & Deployment:**
  - PostgreSQL hosted on Supabase
  - Prisma ORM with automated migrations
  - Fully optimized for deployment on Vercel

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **ORM:** Prisma
- **Database:** PostgreSQL (Supabase)
- **Auth:** NextAuth.js
- **Media:** Cloudinary (`next-cloudinary`)
- **State Management:** Zustand
- **Forms & Validation:** React Hook Form
- **Icons:** React Icons

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Varshith989/airbnb.git
cd airbnb
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Configure environment variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

GOOGLE_ID="your-google-id"
GOOGLE_SECRET="your-google-secret"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_PRESET="airbnb_clone"
```

### 4. Sync Database
```bash
npx prisma db push
node prisma/seed.js
```

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🚢 Deployment to Vercel

1. Push your repository to GitHub.
2. Import the project on [Vercel](https://vercel.com).
3. Add the environment variables from your `.env` file to the Vercel project settings.
4. Deploy!
