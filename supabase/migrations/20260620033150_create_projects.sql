create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 80),
  product_summary text not null
    check (char_length(btrim(product_summary)) between 1 and 500),
  target_user text not null
    check (char_length(btrim(target_user)) between 1 and 500),
  desired_impressions text[] not null default '{}'
    check (cardinality(desired_impressions) between 1 and 3),
  avoid_impressions text[] not null default '{}'
    check (cardinality(avoid_impressions) between 0 and 3),
  differentiator text not null
    check (char_length(btrim(differentiator)) between 1 and 500),
  reference_urls text[] not null default '{}'
    check (cardinality(reference_urls) <= 3),
  created_at timestamptz not null default now()
);

create index projects_user_id_created_at_idx
  on public.projects (user_id, created_at desc);

grant select, insert, update, delete
  on table public.projects
  to authenticated;

alter table public.projects enable row level security;

create policy "Users can view their own projects"
  on public.projects
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own projects"
  on public.projects
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own projects"
  on public.projects
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own projects"
  on public.projects
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
