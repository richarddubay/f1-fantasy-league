CREATE TABLE IF NOT EXISTS public.choices (
  id SERIAL PRIMARY KEY NOT NULL,
  choice VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.driver (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  team_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.grand_prix (
  id SERIAL PRIMARY KEY NOT NULL,
  grand_prix_name VARCHAR(255) NOT NULL,
  grand_prix_location VARCHAR(255) NOT NULL,
  fp1_start TIMESTAMP WITH TIME ZONE,
  fp2_start TIMESTAMP WITH TIME ZONE,
  fp3_start TIMESTAMP WITH TIME ZONE,
  qualifying_start TIMESTAMP WITH TIME ZONE NOT NULL,
  race_start TIMESTAMP WITH TIME ZONE NOT NULL,
  sprint_qualifying_start TIMESTAMP WITH TIME ZONE,
  sprint_race_start TIMESTAMP WITH TIME ZONE,
  is_sprint_weekend BOOLEAN
);

CREATE TABLE IF NOT EXISTS public.picks (
  id SERIAL PRIMARY KEY NOT NULL,
  player_id INT NOT NULL,
  grand_prix_id INT NOT NULL,
  choice_id INT NOT NULL,
  pick_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.player (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.team (
  id SERIAL PRIMARY KEY NOT NULL,
  team_name VARCHAR(100) NOT NULL
);
