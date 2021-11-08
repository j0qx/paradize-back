-- Revert oparadise:acl from pg

BEGIN;

DROP SCHEMA management,paradize;

DROP ROLE user_worker;


COMMIT;
