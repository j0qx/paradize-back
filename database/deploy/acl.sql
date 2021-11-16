-- Deploy oparadise:acl to pg

BEGIN;

--I create the schemas in order to assign the PRIVILEGES according to

/* CREATE SCHEMA management;

CREATE SCHEMA paradize;


-- I transfer the tables to the SCHEMAS

ALTER TABLE offer SET SCHEMA management;
ALTER TABLE favorite SET SCHEMA management;
ALTER TABLE coordinate SET SCHEMA management;
ALTER DOMAIN fr_code SET SCHEMA management;
ALTER DOMAIN email SET SCHEMA management;
ALTER DOMAIN code_phone SET SCHEMA management;
ALTER DOMAIN pint SET SCHEMA paradize;
ALTER DOMAIN supint SET SCHEMA paradize;

 */
 --create a role for the user
/* CREATE ROLE user_worker WITH LOGIN PASSWORD 'user_worker';
-- i attribute the schema for the user
GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA "management" TO user_worker;
--I remove the privileges of the user in case he had to have on the other tables
REVOKE INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA "paradize" FROM user_worker;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA "management" TO oparadise; 

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA "oparadize" TO oparadise; 

 */


COMMIT;
