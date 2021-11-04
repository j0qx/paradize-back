-- Deploy oparadise:constraints to pg

BEGIN;

CREATE DOMAIN city_code AS INT CHECK(
    VALUE ~ '^\d{5}$' -- cas général  \d correspond à [0-9] en SQL
    AND (
      VALUE ~ '^0[1-9]\d{3}$' -- codes qui commencent par 0 sauf 00
      OR VALUE ~ '^9[0-6]\d{3}$' -- codes qui commencent par 9 hors DOM et TOM
      OR VALUE ~ '^[1-8]\d{4}$' --autres codes de la métropole
      OR VALUE ~ '^9[78][12478]\d{2}$' -- codes DOM et TOM
    )
  );

  ALTER TABLE
  user_account
ALTER COLUMN
  city_code TYPE city_code;

  CREATE DOMAIN email AS text CHECK (
      VALUE ~ '^\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\Z$'
  );

ALTER TABLE
   user_account
    ALTER COLUMN
    email TYPE email;

    CREATE DOMAIN number_phone AS INT CHECK (
    VALUE ~ '^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$'
);

ALTER TABLE user_account ALTER COLUMN number_phone TYPE number_phone;


CREATE DOMAIN password AS VARCHAR (255) CHECK(
    VALUE ~ '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
);
ALTER TABLE user_account ALTER COLUMN password TYPE password;

CREATE DOMAIN pint AS int CHECK(VALUE > 0);
CREATE DOMAIN supint AS int CHECK(VALUE >= 9);

ALTER TABLE
     search
ALTER COLUMN
     number_of_room TYPE pint,
ALTER COLUMN 
     number_of_bedroom  TYPE pint,
ALTER COLUMN
     living_area TYPE supint;     

     

COMMIT;
