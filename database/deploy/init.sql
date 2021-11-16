-- Deploy oparadise:init to pg

BEGIN;

DROP TABLE IF EXISTS "user_account", "coordinate", "favorite", "offer", "search", "setting";

CREATE TABLE user_account (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(32) NOT NULL UNIQUE,
    first_name VARCHAR(64) ,
    last_name VARCHAR(64) ,
    civility VARCHAR(32) ,
    email TEXT NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address TEXT ,
    city_code INT ,
    city TEXT ,
    phone INT UNIQUE ,
    access_token TEXT UNIQUE,
    avatar TEXT
);
CREATE TABLE coordinate (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    latitude decimal(12,10 ) NOT NULL,
    longitude decimal(12, 10) NOT NULL
    --altitude DECIMAL(10, 8) NOT NULL
);

CREATE TABLE offer ( 
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    picture  text[],
    description TEXT NOT NULL,
    status TEXT NOT NULL,
    user_account_id int REFERENCES user_account(id),
    coordinate_id int REFERENCES coordinate(id)

);


CREATE TABLE search ( 
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    calculation_typeof_zone TEXT,
    distance FLOAT ,
    travel_time TIME NOT NULL,
    travel_type TEXT NOT NULL,
    "zone" POLYGON NOT NULL,
    price FLOAT NOT NULL,
    number_of_room INT NOT NULL,
    number_of_bedroom INT NOT NULL,
    living_area FLOAT NOT NULL,
    land_area  FLOAT ,
    offer_id int NOT NULL REFERENCES offer(id)
);

CREATE TABLE setting (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    weather BOOLEAN NOT NULL,
    internet_network BOOLEAN NOT NULL,
    mobile_network BOOLEAN NOT NULL,
    flood BOOLEAN NOT NULL,
    cultural_activity BOOLEAN NOT NULL,
    employment BOOLEAN NOT NULL,
    hospital BOOLEAN NOT NULL,
    school BOOLEAN NOT NULL,
    food BOOLEAN NOT NULL,
    restaurant BOOLEAN NOT NULL,
    distance_sea BOOLEAN NOT NULL,
    distance_ski BOOLEAN NOT NULL,
    distance_border BOOLEAN NOT NULL,
    user_account_id int NOT NULL REFERENCES user_account(id)

);

CREATE TABLE favorite (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_account_id int NOT NULL REFERENCES user_account(id),
    offer_id int NOT NULL REFERENCES offer(id)

);

COMMIT;
