CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  title text NOT NULL,
  job_title text NOT NULL,
  vacancy integer NOT NULL,
  job_type text,
  category text NOT NULL,
  experience text NOT NULL,
  salary text,
  job_description text NOT NULL,
  company_name text,
  company_address text,
  company_email text NOT NULL,
  company_phone text,
  application_deadline date,
  additional_info text,
  is_draft boolean DEFAULT true,
  template_id text,
  template_style text,
  user_id uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can insert their own jobs"
ON jobs
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own jobs"
ON jobs
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs"
ON jobs
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own jobs"
ON jobs
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Enable public read access"
ON jobs
FOR SELECT
TO public
USING (is_draft = false);
