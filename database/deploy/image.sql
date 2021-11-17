-- Deploy oparadise:image to pg

BEGIN;

ALTER TABLE offer
ADD COLUMN price TEXT NOT NULL;

COMMIT;
