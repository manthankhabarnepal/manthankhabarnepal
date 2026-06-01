-- Create news articles table
CREATE TABLE IF NOT EXISTS public.news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'general',
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create staff profiles table
CREATE TABLE IF NOT EXISTS public.staff_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'editor',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;

-- News articles policies
-- Anyone can read published articles
CREATE POLICY "Anyone can read published articles" ON public.news_articles
  FOR SELECT USING (published = true);

-- Staff can read all articles
CREATE POLICY "Staff can read all articles" ON public.news_articles
  FOR SELECT USING (auth.uid() IN (SELECT id FROM public.staff_profiles));

-- Staff can insert articles
CREATE POLICY "Staff can insert articles" ON public.news_articles
  FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.staff_profiles));

-- Staff can update articles
CREATE POLICY "Staff can update articles" ON public.news_articles
  FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.staff_profiles));

-- Staff can delete articles
CREATE POLICY "Staff can delete articles" ON public.news_articles
  FOR DELETE USING (auth.uid() IN (SELECT id FROM public.staff_profiles));

-- Staff profiles policies
CREATE POLICY "Staff can read own profile" ON public.staff_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Staff can update own profile" ON public.staff_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_news_articles_updated_at ON public.news_articles;
CREATE TRIGGER update_news_articles_updated_at
  BEFORE UPDATE ON public.news_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
