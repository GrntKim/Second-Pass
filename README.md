# Second Pass

> Make the next design decision deliberate.

Second Pass is an intent-aware design review tool for AI-generated web UI.

Users create a project, describe the intended product signal, upload a screen, and receive evidence-based design decisions.

## Stack

- Next.js App Router
- Supabase Auth, Postgres, and Row Level Security
- Tailwind CSS and shadcn/ui

## Local development

1. Create a `.env.local` file with your Supabase project credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   ```

2. Install dependencies and start the app:

   ```bash
   npm install
   npm run dev
   ```

## Database

Database changes live in `supabase/migrations` and are applied to the linked Supabase project with:

```bash
npx supabase db push
```

The first migration creates the user-owned `public.projects` table and its Row Level Security policies.
