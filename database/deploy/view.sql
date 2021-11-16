-- Deploy oparadise:view to pg

BEGIN;

-- on crèe une vue qui va aggrégé les résultats entre les offer et favorite d'un user
/* 
CREATE VIEW v_offer_user AS

SELECT offer.id,offer.title,offer.picture,offer.description,offer.status,

offer.user_account_id,offer.coordinate_id,

coordinate.latitude,coordinate.longitude AS coordinate FROM offer 

JOIN coordinate ON offer.coordinate_id = coordinate.id;

-- the view tha brings together offer coordinate and favorite
CREATE VIEW  AS

SELECT offer.id,offer.title,offer.picture,offer.description,offer.status,offer.user_account_id,offer.coordinate_id,

coordinate.latitude,coordinate.longitude AS coordinate FROM offer 

JOIN coordinate ON offer.coordinate_id = coordinate.id

JOIN favorite ON favorite.id = favorite.offer_id;



CREATE VIEW viewAll AS

SELECT offer.id,offer.title,offer.picture,offer.description,offer.status,

offer.user_account_id,offer.coordinate_id,

coordinate.latitude,coordinate.longitude AS coordinate FROM offer 

JOIN coordinate ON offer.coordinate_id = coordinate.id

JOIN search ON search.offer_id = offer.id
JOIN setting ON setting.user_account_id = user_account.id;


 */

COMMIT;
