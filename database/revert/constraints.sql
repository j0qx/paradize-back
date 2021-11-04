-- Revert oparadise:constraints from pg

BEGIN;

-- on supprime les domaines
DROP DOMAIN IF EXISTS pint,supint,postal_code,mail,number_phone,password CASCADE;


COMMIT;
