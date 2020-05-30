-- country profile: {
--         name: ________,
-- 	categories: ________, // interests (animal, building, drink, food, indoor, outdoor, or plant)
-- 	cost: _______, // wealth (luxury, moderate, or economy)
-- 	lang: ______,
-- }
INSERT INTO
    Countries (name, code, categories, cost, lang, image)
VALUES
    (
        'Sri Lanka',
        'LK',
        'building, outdoor_mountain, plant',
        'economy',
        'si, ta, en',
        'sri-lanka.jpg'
    ),
    (
        'Germany',
        'DE',
        'food, drink, building, outdoor_city',
        'moderate',
        'de',
        'germany.jpg'
    ),
    (
        'Zimbabwe',
        'ZW',
        'animal, outdoor_field, outdoor_water, plant, food',
        'luxury',
        'sn, nr, nd, en',
        'zimbabwe.jpg'
    ),
    (
        'Panama',
        'PA',
        'outdoor_city, outdoor_oceanbeach',
        'luxury',
        'es',
        'panama.jpg'
    ),
    (
        'Kyrgyzstan',
        'KG',
        'outdoor_field, animal',
        'economy',
        'ky, ru',
        'kyrgyzstan.jpg'
    ),
    (
        'Jordan',
        'JO',
        'building, outdoor_oceanbeach, outdoor_water',
        'luxury',
        'ar, arb',
        'jordan.jpg'
    ),
    (
        'Indonesia',
        'ID',
        'building, outdoor_oceanbeach, outdoor_water, plant',
        'moderate',
        'id',
        'indonesia.jpg'
    ),
    (
        'Belarus',
        'BY',
        'building, outdoor_oceanbeach, food',
        'economy',
        'be, ru',
        'belarus.jpg'
    ),
    (
        'Belize',
        'BZ',
        'outdoor_oceanbeach',
        'luxury',
        'rop, en',
        'belize.jpg'
    ),
    (
        'Egypt',
        'EG',
        'animal, outdoor_stonerock, food',
        'luxury',
        'arb',
        'egypt.jpg'
    ),
    (
        'India',
        'IN',
        'building, outdoor_mountain',
        'economy',
        'hi, en',
        'india.jpg'
    ),
    (
        'Oman',
        'OM',
        'outdoor_mountain, outdoor_water',
        'luxury',
        'ar',
        'oman.jpg'
    ),
    (
        'New Zealand',
        'NZ',
        'outdoor_mountain, outdoor_oceanbeach',
        'moderate',
        'en, mi',
        'new-zealand.jpg'
    ),
    (
        'Croatia',
        'HR',
        'outdoor_mountain, outdoor_oceanbeach',
        'moderate',
        'hr',
        'croatia.jpg'
    );