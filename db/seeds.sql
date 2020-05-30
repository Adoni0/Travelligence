-- country profile: {
--         name: ________,
-- 	categories: ________, // interests (animal, building, drink, food, indoor, outdoor, or plant)
-- 	cost: _______, // wealth (luxury, moderate, or economy)
-- 	lang: ______,
-- }

INSERT INTO Countries (name, categories, cost, lang, image)
    VALUES
    ('Sri Lanka', 'building, outdoor_mountain, plant', 'economy', 'si, ta, en', 'sri-lanka.jpg'),
    ('Germany', 'food, drink, building, outdoor_city', 'moderate', 'de', 'germany.jpg'),
    ('Zimbabwe', 'animal, outdoor_field, outdoor_water, plant, food', 'luxury', 'sn, nr, nd, en', 'zimbabwe.jpg'),
    ('Panama', 'outdoor', 'luxury', 'es', 'panama.jpg'),
    ('Kyrgyzstan', 'outdoor_field, animal', 'economy', 'ky, ru', 'kyrgyzstan.jpg'),
    ('Jordan', 'building, outdoor_oceanbeach, outdoor_water', 'luxury', 'ar, arb', 'jordan.jpg'),
    ('Indonesia', 'building, outdoor_oceanbeach, outdoor_water, plant', 'moderate', 'id', 'indonesia.jpg'),
    ('Belarus', 'building, outdoor_oceanbeach, food', 'economy', 'be, ru', 'belarus.jpg'),
    ('Belize', 'outdoor_oceanbeach', 'luxury', 'rop, en', 'belize.jpg'),
    ('Egypt', 'animal, outdoor_stonerock, food', 'luxury', 'arb', 'egypt.jpg'),
    ('India', 'building, outdoor_mountain', 'economy', 'hi, en', 'india.jpg'),
    ('Oman', 'outdoor_mountain, outdoor_water', 'luxury', 'ar', 'oman.jpg'),
    ('New Zealand', 'outdoor_mountain, outdoor_oceanbeach', 'moderate', 'en, mi', 'new-zealand.jpg'),
    ('Croatia', 'outdoor_mountain, outdoor_oceanbeach', 'moderate', 'hr', 'croatia.jpg');