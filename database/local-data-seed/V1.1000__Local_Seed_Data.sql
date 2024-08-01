INSERT INTO
  public.choices (choice, created_at)
VALUES
  ('1st Place', CURRENT_TIMESTAMP),
  ('2nd Place', CURRENT_TIMESTAMP),
  ('3rd Place', CURRENT_TIMESTAMP),
  ('10th Place', CURRENT_TIMESTAMP),
  ('DNF', CURRENT_TIMESTAMP),
  ('Top Team', CURRENT_TIMESTAMP),
  ('Sprint 10th Place', CURRENT_TIMESTAMP),
  ('Sprint DNF', CURRENT_TIMESTAMP),
  ('Sprint Top Team', CURRENT_TIMESTAMP);

WITH inserted_teams AS (
  INSERT INTO public.team (team_name, created_at)
  VALUES
    ('Alpine', CURRENT_TIMESTAMP),
    ('Aston Martin', CURRENT_TIMESTAMP),
    ('Ferrari', CURRENT_TIMESTAMP),
    ('Haas', CURRENT_TIMESTAMP),
    ('Kick Sauber', CURRENT_TIMESTAMP),
    ('McLaren', CURRENT_TIMESTAMP),
    ('Mercedes', CURRENT_TIMESTAMP),
    ('Red Bull', CURRENT_TIMESTAMP),
    ('Visa Cash App RB', CURRENT_TIMESTAMP),
    ('Williams', CURRENT_TIMESTAMP)
  RETURNING id, team_name
)

INSERT INTO
  public.driver (first_name, last_name, team_id, driver_number, place_of_birth, country, birth_date, created_at)
VALUES
  (
    'Alexander',
    'Albon',
    (SELECT id FROM inserted_teams WHERE team_name = 'Williams'),
    23,
    'London, England',
    'Thailand',
    '23/03/1996',
    CURRENT_TIMESTAMP
  ),
  (
    'Fernando',
    'Alonso',
    (SELECT id FROM inserted_teams WHERE team_name = 'Aston Martin'),
    14,
    'Oviedo, Spain',
    'Spain',
    '07/29/1981'
    CURRENT_TIMESTAMP
  ),
  (
    'Valtteri',
    'Bottas',
    (SELECT id FROM inserted_teams WHERE team_name = 'Kick Sauber'),
    77,
    'Nastola, Finland',
    'Finland',
    '08/28/1989',
    CURRENT_TIMESTAMP
  ),
  (
    'Pierre',
    'Gasly',
    (SELECT id FROM inserted_teams WHERE team_name = 'Alpine'),
    10,
    'Rouen, France',
    'France',
    '02/07/1996',
    CURRENT_TIMESTAMP
  ),
  (
    'Lewis',
    'Hamilton',
    (SELECT id FROM inserted_teams WHERE team_name = 'Mercedes'),
    44,
    'Stevenage, England',
    'United Kingdom',
    '01/07/1985',
    CURRENT_TIMESTAMP
  ),
  (
    'Nico',
    'Hülkenberg',
    (SELECT id FROM inserted_teams WHERE team_name = 'Haas'),
    27,
    'Emmerich am Rhein, Germany',
    'Germany',
    '08/19/1987',
    CURRENT_TIMESTAMP
  ),
  (
    'Charles',
    'Leclerc',
    (SELECT id FROM inserted_teams WHERE team_name = 'Ferrari'),
    16,
    'Monte Carlo, Monaco',
    'Monaco', 
    '10/16/1997',
    CURRENT_TIMESTAMP
  ),
  (
    'Kevin',
    'Magnussen',
    (SELECT id FROM inserted_teams WHERE team_name = 'Haas'),
    20,
    'Roskilde, Denmark',
    'Denmark',
    '10/05/1992',
    CURRENT_TIMESTAMP
  ),
  (
    'Lando',
    'Norris',
    (SELECT id FROM inserted_teams WHERE team_name = 'McLaren'),
    4,
    'Bristol, England',
    'United Kingdom', 
    '11/13/1999',
    CURRENT_TIMESTAMP
  ),
  (
    'Esteban',
    'Ocon',
    (SELECT id FROM inserted_teams WHERE team_name = 'Alpine'),
    31,
    'Évreux, Normandy',
    'France',
    '09/17/1996',
    CURRENT_TIMESTAMP
  ),
  (
    'Sergio',
    'Pérez',
    (SELECT id FROM inserted_teams WHERE team_name = 'Red Bull'),
    11,
    'Guadalajara, Mexico',
    'Mexico',
    '01/26/1990',
    CURRENT_TIMESTAMP
  ),
  (
    'Oscar',
    'Piastri',
    (SELECT id FROM inserted_teams WHERE team_name = 'McLaren'),
    81,
    'Melbourne, Victoria',
    'Australia',
    '04/06/2001',
    CURRENT_TIMESTAMP
  ),
  (
    'Daniel',
    'Ricciardo',
    (SELECT id FROM inserted_teams WHERE team_name = 'Visa Cash App RB'),
    3,
    'Perth, Australia',
    'Australia',
    '07/01/1989',
    CURRENT_TIMESTAMP
  ),
  (
    'George',
    'Russell',
    (SELECT id FROM inserted_teams WHERE team_name = 'Mercedes'),
    63,
    'King''s Lynn, England',
    'United Kingdom',
    '02/15/1998',
    CURRENT_TIMESTAMP
  ),
  (
    'Carlos',
    'Sainz',
    (SELECT id FROM inserted_teams WHERE team_name = 'Ferrari'),
    55,
    'Madrid, Spain',
    'Spain',
    '09/01/1994',
    CURRENT_TIMESTAMP
  ),
  (
    'Logan',
    'Sargeant',
    (SELECT id FROM inserted_teams WHERE team_name = 'Williams'),
    2,
    'Fort Lauderdale, Florida',
    'United States',
    '12/31/2000',
    CURRENT_TIMESTAMP
  ),
  (
    'Lance',
    'Stroll',
    (SELECT id FROM inserted_teams WHERE team_name = 'Aston Martin'),
    18,
    'Montreal, Canada',
    'Canada',
    '10/29/1998',
    CURRENT_TIMESTAMP
  ),
  (
    'Yuki',
    'Tsunoda',
    (SELECT id FROM inserted_teams WHERE team_name = 'Visa Cash App RB'),
    22,
    'Sagamihara, Japan',
    'Japan',
    '05/11/2000',
    CURRENT_TIMESTAMP
  ),
  (
    'Max',
    'Verstappen',
    (SELECT id FROM inserted_teams WHERE team_name = 'Red Bull'),
    1,
    'Hasselt, Belgium',
    'Netherlands',
    '09/30/1997',
    CURRENT_TIMESTAMP
  ),
  (
    'Guanyu',
    'Zhou',
    (SELECT id FROM inserted_teams WHERE team_name = 'Kick Sauber'),
    24,
    'Shanghai, China',
    'China',
    '05/30/1999',
    CURRENT_TIMESTAMP
  );

INSERT INTO
  public.grand_prix (grand_prix_name, grand_prix_location, fp1_start, fp2_start, fp3_start, qualifying_start, race_start, sprint_qualifying_start, sprint_race_start, is_sprint_weekend, circuit_name, created_at)
VALUES
  (
    'Formula 1 Gulf Air Bahrain Grand Prix',
    'Sakhir, Bahrain',
    '2024-02-29 14:30:00+03:00',
    '2024-02-29 18:00:00+03:00',
    '2024-03-01 15:30:00+03:00',
    '2024-03-01 19:00:00+03:00',
    '2024-03-02 18:00:00+03:00',
    null,
    null,
    false,
    'Bahrain International Circuit',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 STC Saudi Arabian Grand Prix',
    'Jeddah, Saudi Arabia',
    '2024-03-07 16:30:00+03:00',
    '2024-03-07 20:10:00+03:00',
    '2024-03-08 16:30:00+03:00',
    '2024-03-08 20:00:00+03:00',
    '2024-03-09 20:00:00+03:00',
    null,
    null,
    false,
    'Jeddah Corniche Circuit',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Rolex Australian Grand Prix',
    'Melbourne, Australia',
    '2024-03-22 12:30:00+11:00',
    '2024-03-22 16:00:00+11:00',
    '2024-03-23 12:30:00+11:00',
    '2024-03-23 16:00:00+11:00',
    '2024-03-24 15:00:00+11:00',
    null,
    null,
    false,
    'Albert Park Grand Prix Circuit',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 MSC Cruises Japanese Grand Prix',
    'Suzuka, Japan',
    '2024-04-05 11:30:00+09:00',
    '2024-04-05 15:00:00+09:00',
    '2024-04-06 11:30:00+09:00',
    '2024-04-06 15:00:00+09:00',
    '2024-04-07 14:00:00+09:00',
    null,
    null,
    false,
    'Suzuka Circuit',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Lenovo Chinese Grand Prix',
    'Shanghai, China',
    '2024-04-19 11:30:00+08:00',
    null,
    null,
    '2024-04-20 15:00:00+08:00',
    '2024-04-21 15:00:00+08:00',
    '2024-04-19 15:30:00+08:00',
    '2024-04-20 11:00:00+08:00',
    true,
    'Shanghai International Circuit',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Crypto.com Miami Grand Prix',
    'Miami, Florida, United States',
    '2024-05-03 12:30:00-04:00',
    null,
    null,
    '2024-05-04 16:00:00-04:00',
    '2024-05-05 16:00:00-04:00',
    '2024-05-03 16:30:00-04:00',
    '2024-05-04 12:00:00-04:00',
    true,
    'Miami International Autodrome',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 MSC Cruises Gran Premio Del Made In Italy E Dell''Emilia-Romagna',
    'Imola, Italy',
    '2024-05-17 13:30:00+02:00',
    '2024-05-17 17:00:00+02:00',
    '2024-05-18 12:30:00+02:00',
    '2024-05-18 16:00:00+02:00',
    '2024-05-19 15:00:00+02:00',
    null,
    null,
    false,
    'Autodromo Internazionale Enzo e Dino Ferrari',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Grand Prix de Monaco',
    'Monaco, Monaco',
    '2024-05-24 13:30:00+02:00',
    '2024-05-24 17:00:00+02:00',
    '2024-05-25 12:30:00+02:00',
    '2024-05-25 16:00:00+02:00',
    '2024-05-26 15:00:00+02:00',
    null,
    null,
    false,
    'Circuit de Monaco',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 AWS Grand Prix du Canada',
    'Montreal, Canada',
    '2024-06-07 13:30:00-04:00',
    '2024-06-07 17:00:00-04:00',
    '2024-06-08 12:30:00-04:00',
    '2024-06-08 16:00:00-04:00',
    '2024-06-09 14:00:00-04:00',
    null,
    null,
    false,
    'Circuit Gilles-Villeneuve',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Aramco Gran Premio de España',
    'Barcelona, Spain',
    '2024-06-21 13:30:00+02:00',
    '2024-06-21 17:00:00+02:00',
    '2024-06-22 12:30:00+02:00',
    '2024-06-22 16:00:00+02:00',
    '2024-06-23 15:00:00+02:00',
    null,
    null,
    false,
    'Circuit de Barcelona-Catalunya',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Qatar Airways Austrian Grand Prix',
    'Spielberg, Austria',
    '2024-06-28 12:30:00+02:00',
    null,
    null,
    '2024-06-29 16:00:00+02:00',
    '2024-06-30 15:00:00+02:00',
    '2024-06-28 16:30:00+02:00',
    '2024-06-29 12:00:00+02:00',
    true,
    'Red Bull Ring',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Qatar Airways British Grand Prix',
    'Silverstone, United Kingdom',
    '2024-07-05 12:30:00+01:00',
    '2024-07-05 16:00:00+01:00',
    '2024-07-06 11:30:00+01:00',
    '2024-07-06 15:00:00+01:00',
    '2024-07-07 15:00:00+01:00',
    null,
    null,
    false,
    'Silverstone Circuit',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Hungarian Grand Prix',
    'Budapest, Hungary',
    '2024-07-19 13:30:00+02:00',
    '2024-07-19 17:00:00+02:00',
    '2024-07-20 12:30:00+02:00',
    '2024-07-20 16:00:00+02:00',
    '2024-07-21 15:00:00+02:00',
    null,
    null,
    false,
    'Hungaroring',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Rolex Belgian Grand Prix',
    'Spa-Francorchamps, Belgium',
    '2024-07-26 13:30:00+02:00',
    '2024-07-26 17:00:00+02:00',
    '2024-07-27 12:30:00+02:00',
    '2024-07-27 16:00:00+02:00',
    '2024-07-28 15:00:00+02:00',
    null,
    null,
    false,
    'Circuit de Spa-Francorchamps',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Heineken Dutch Grand Prix',
    'Zandvoort, Netherlands',
    '2024-08-23 12:30:00+02:00',
    '2024-08-23 16:00:00+02:00',
    '2024-08-24 11:30:00+02:00',
    '2024-08-24 15:00:00+02:00',
    '2024-08-25 15:00:00+02:00',
    null,
    null,
    false,
    'Circuit Zandvoort',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Pirelli Gran Premio D''Italia',
    'Monza, Italy',
    '2024-08-30 13:30:00+02:00',
    '2024-08-30 17:00:00+02:00',
    '2024-08-31 12:30:00+02:00',
    '2024-08-31 16:00:00+02:00',
    '2024-09-01 15:00:00+02:00',
    null,
    null,
    false,
    'Autodromo Nazionale Monza',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Qatar Airways Azerbaijan Grand Prix',
    'Baku, Azerbaijan',
    '2024-09-13 13:30:00+04:00',
    '2024-09-13 17:00:00+04:00',
    '2024-09-14 12:30:00+04:00',
    '2024-09-14 16:00:00+04:00',
    '2024-09-15 15:00:00+04:00',
    null,
    null,
    false,
    'Baku City Circuit',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Singapore Airlines Singapore Grand Prix',
    'Singapore, Singapore',
    '2024-09-20 17:30:00+08:00',
    '2024-09-20 21:00:00+08:00',
    '2024-09-21 17:30:00+08:00',
    '2024-09-21 21:00:00+08:00',
    '2024-09-22 20:00:00+08:00',
    null,
    null,
    false,
    'Marina Bay Street Circuit',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Pirelli United States Grand Prix',
    'Austin, United States',
    '2024-10-18 12:30:00-05:00',
    null,
    null,
    '2024-10-19 17:00:00-05:00',
    '2024-10-20 14:00:00-05:00',
    '2024-10-18 16:30:00-05:00',
    '2024-10-19 13:00:00-05:00',
    true,
    'Circuit of the Americas',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Gran Premio de la Ciudad de México',
    'Mexico City, Mexico',
    '2024-10-25 12:30:00-06:00',
    '2024-10-25 16:00:00-06:00',
    '2024-10-26 11:30:00-06:00',
    '2024-10-26 15:00:00-06:00',
    '2024-10-27 14:00:00-06:00',
    null,
    null,
    false,
    'Autódromo Hermanos Rodríguez',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Lenovo Grande Prêmio De São Paulo',
    'São Paulo, Brazil',
    '2024-11-01 11:30:00-03:00',
    null,
    null,
    '2024-11-02 15:00:00-03:00',
    '2024-11-03 14:00:00-03:00',
    '2024-11-01 15:30:00-03:00',
    '2024-11-02 11:00:00-03:00',
    true,
    'Autódromo José Carlos Pace',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Heineken Silver Las Vegas Grand Prix',
    'Las Vegas, United States',
    '2024-11-21 18:30:00-08:00',
    '2024-11-21 22:00:00-08:00',
    '2024-11-22 18:30:00-08:00',
    '2024-11-22 22:00:00-08:00',
    '2024-11-23 22:00:00-08:00',
    null,
    null,
    false,
    'Las Vegas Strip Circuit',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Qatar Airways Qatar Grand Prix',
    'Lusail, Qatar',
    '2024-11-29 16:30:00+03:00',
    null,
    null,
    '2024-11-30 20:00:00+03:00',
    '2024-12-01 19:00:00+03:00',
    '2024-11-29 20:30:00+03:00',
    '2024-11-30 16:00:00+03:00',
    true,
    'Lusail International Circuit',
    CURRENT_TIMESTAMP
  ),
  (
    'Formula 1 Etihad Airways Abu Dhabi Grand Prix',
    'Abu Dhabi, United Arab Emirates',
    '2024-12-06 13:30:00+04:00',
    '2024-12-06 17:00:00+04:00',
    '2024-12-07 14:30:00+04:00',
    '2024-12-07 18:00:00+04:00',
    '2024-12-08 17:00:00+04:00',
    null,
    null,
    false,
    'Yas Marina Circuit',
    CURRENT_TIMESTAMP
  );

INSERT INTO
  public.player (first_name, last_name, created_at)
VALUES
  ('Rich', 'Dubay', CURRENT_TIMESTAMP);
