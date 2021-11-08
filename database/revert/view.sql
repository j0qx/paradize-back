-- Revert oparadise:view from pg

BEGIN;

DROP VIEW v_offer_user, v_offer_user_favorite;

COMMIT;
