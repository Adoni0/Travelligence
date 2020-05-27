-- country profile: {
--         name: ________,
-- 	categories: ________, // interests (animal, building, drink, food, indoor, outdoor, or plant)
-- 	cost: _______, // wealth (luxury, moderate, or economy)
-- 	lang: ______,
-- }

INSERT INTO Countries (name, categories, cost, lang)
    VALUES
    ('Sri Lanka', 'building, outdoor_mountain, plant', 'economy', 'si, ta, en'),
    ('Germany', 'food, drink, building, outdoor_city', 'moderate', 'de'),
    ('Zimbabwe', 'animal, outdoor_field, outdoor_water, plant, food', 'luxury', 'sn, nr, nd, en'),
    ('Panama', 'outdoor', 'luxury', 'es'),
    ('Kyrgyzstan', 'outdoor_field, animal', 'economy', 'ky, ru'),
    ('Jordan', 'building, outdoor_oceanbeach, outdoor_water', 'luxury', 'ar, arb'),
    ('Indonesia', 'building, outdoor_oceanbeach, outdoor_water, plant', 'moderate', 'id'),
    ('Belarus', 'building, outdoor_oceanbeach, food', 'economy', 'be, ru'),
    ('Belize', 'outdoor_oceanbeach', 'luxury', 'rop, en'),
    ('Egypt', 'animal, outdoor_stonerock, food', 'luxury', 'arb'),
    ('India', 'building, outdoor_mountain', 'economy', 'hi, en'),
    ('Oman', 'outdoor_mountain, outdoor_water', 'luxury', 'ar'),
    ('New Zealand', 'outdoor_mountain, outdoor_oceanbeach', 'moderate', 'en, mi'),
    ('Croatia', 'outdoor_mountain, outdoor_oceanbeach', 'moderate', 'hr');