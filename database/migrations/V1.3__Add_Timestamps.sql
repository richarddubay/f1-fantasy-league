ALTER TABLE public.choices
ADD COLUMN created_at TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP,
ADD COLUMN deleted_at TIMESTAMP;

ALTER TABLE public.driver
ADD COLUMN created_at TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP,
ADD COLUMN deleted_at TIMESTAMP;

ALTER TABLE public.grand_prix
ADD COLUMN created_at TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP,
ADD COLUMN deleted_at TIMESTAMP;

ALTER TABLE public.picks
ADD COLUMN created_at TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP,
ADD COLUMN deleted_at TIMESTAMP;

ALTER TABLE public.player
ADD COLUMN created_at TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP,
ADD COLUMN deleted_at TIMESTAMP;

ALTER TABLE public.team
ADD COLUMN created_at TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP,
ADD COLUMN deleted_at TIMESTAMP;