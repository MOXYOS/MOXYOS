-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  first_name text,
  last_name text,
  avatar_url text,
  website text
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for Businesses
create table businesses (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  category text not null,
  bio text,
  video_url text, -- The "Reel"
  thumbnail_url text,
  rating float default 0,
  verified boolean default false,
  location text
);

-- RLS for Businesses
alter table businesses enable row level security;

create policy "Businesses are viewable by everyone." on businesses
  for select using (true);

create policy "Users can insert their own business." on businesses
  for insert with check (auth.uid() = owner_id);

create policy "Owners can update their own business." on businesses
  for update using (auth.uid() = owner_id);

-- Create a table for Reviews
create table reviews (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  rating int check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Reviews
alter table reviews enable row level security;

create policy "Reviews are viewable by everyone." on reviews
  for select using (true);

create policy "Authenticated users can create reviews." on reviews
  for insert with check (auth.uid() = user_id);

-- Function to handle new user signup (automatically create profile)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Insert Mock Data (Optional - useful for testing)
-- You would replace 'owner_id' with a real UUID if you want to test ownership
/*
insert into businesses (name, category, bio, video_url, rating, verified)
values 
('Bloom & Brew Cafe', 'Coffee & Bakery', 'Start your morning with a smile.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 4.9, true),
('Golden Scissors', 'Barber Shop', 'Classic cuts, modern vibes.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', 4.8, true);
*/
