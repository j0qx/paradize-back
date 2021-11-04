-- Revert oparadise:init from pg

BEGIN;


DROP TABLE IF EXISTS user_account,offer,coordinate,search,setting,favorite;
COMMIT;
