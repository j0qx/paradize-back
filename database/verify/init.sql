-- Verify oparadise:init on pg

BEGIN;

SELECT id,first_name,last_name,civility,mail,password,address,postal_code,city,number_phone FROM user WHERE false;

SELECT id,title,picture,description,status,coordinate_id FROM offer WHERE false;

SELECT id,latitude,longitude FROM coordinate WHERE false;

SELECT id,calculation_typeof_zone,distance,travel_time,travel_type,zone,number_of_rooms,number_of_bedrooms,living_area,land_area,offer_id FROM search WHERE false;

SELECT id,weather,internet_network,mobile_network,flood,cultural_activity,employment,hospital,school,food,restaurant,distance_sea,distance_ski,distance_border,user_id FROM setting WHERE false;

SELECT id,user_id,offer_id FROM favorite WHERE false;

ROLLBACK;
