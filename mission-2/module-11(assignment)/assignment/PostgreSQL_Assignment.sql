-- Active: 1748110225737@@127.0.0.1@5432@ph@public
-- Active: 1748110225737@@127.0.0.1@5432@conservation_db@public-- Active: 1748110225737@@127.0.0.1@5432@ph@public

-- database creation
CREATE DATABASE conservation_db;


-- create rangers, species and insightings table with constraints
CREATE TABLE rangers (
    ranger_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL
);

CREATE TABLE species (
    species_id SERIAL PRIMARY KEY,
    common_name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(100) NOT NULL,
    discovery_date DATE NOT NULL,
    conservation_status VARCHAR(50) NOT NULL CHECK (conservation_status IN ('Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern'))
);

CREATE TABLE sightings (
    sighting_id SERIAL PRIMARY KEY,
    ranger_id INTEGER NOT NULL REFERENCES rangers(ranger_id) ON DELETE RESTRICT,
    species_id INTEGER NOT NULL REFERENCES species(species_id) ON DELETE RESTRICT,
    location VARCHAR(100) NOT NULL,
    sighting_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);


-- insert datas into tables
INSERT INTO rangers (ranger_id, name, region) VALUES
(1, 'Alice Green', 'Northern Hills'),
(2, 'Bob White', 'River Delta'),
(3, 'Carol King', 'Mountain Range');

INSERT INTO species (species_id, common_name, scientific_name, discovery_date, conservation_status) VALUES
(1, 'Snow Leopard', 'Panthera uncia', '1775-01-01', 'Endangered'),
(2, 'Bengal Tiger', 'Panthera tigris tigris', '1758-01-01', 'Endangered'),
(3, 'Red Panda', 'Ailurus fulgens', '1825-01-01', 'Vulnerable'),
(4, 'Asiatic Elephant', 'Elephas maximus indicus', '1758-01-01', 'Endangered');

INSERT INTO sightings (sighting_id, species_id, ranger_id, location, sighting_time, notes) VALUES
(1, 1, 1, 'Peak Ridge', '2024-05-10 07:45:00', 'Camera trap image captured'),
(2, 2, 2, 'Bankwood Area', '2024-05-12 16:20:00', 'Juvenile seen'),
(3, 3, 3, 'Bamboo Grove East', '2024-05-15 09:10:00', 'Feeding observed'),
(4, 1, 2, 'Snowfall Pass', '2024-05-18 18:30:00', NULL);

SELECT * FROM rangers;
SELECT * FROM species;
SELECT * from sightings;


-- problem - 1 | insert data
INSERT INTO rangers (name, region)
VALUES ('Derek Fox', 'Coastal Plains');


-- problem - 2 | count unique species
SELECT COUNT(DISTINCT species_id) AS unique_species_count
FROM sightings;


-- problem - 3 | find all sightings where the location includes "pass"
SELECT sighting_id, species_id, ranger_id, location, sighting_time, notes
FROM sightings
WHERE location LIKE '%Pass%';


-- problem - 4 | list each other rangers name and total number of sightings
SELECT r.name, COUNT(s.sighting_id) AS total_sightings
FROM rangers r
LEFT JOIN sightings s ON r.ranger_id = s.ranger_id
GROUP BY r.name
ORDER BY r.name;


-- problem - 5 | list species that never been sighted
SELECT sp.common_name
FROM species sp
LEFT JOIN sightings s ON sp.species_id = s.species_id
WHERE s.sighting_id IS NULL;


-- problem - 6 | show the most recent 2 sightings
SELECT sp.common_name, s.sighting_time, r.name
FROM sightings s
JOIN species sp ON s.species_id = sp.species_id
JOIN rangers r ON s.ranger_id = r.ranger_id
ORDER BY s.sighting_time DESC
LIMIT 2;


-- problem - 7 | update species discovered before 1800 to status 'Historic'
ALTER TABLE species
DROP CONSTRAINT species_conservation_status_check,
ADD CONSTRAINT species_conservation_status_check
CHECK (conservation_status IN ('Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern', 'Historic'));


-- problem - 8 | label each sighting's time of day
SELECT sighting_id,
       CASE
           WHEN EXTRACT(HOUR FROM sighting_time) < 12 THEN 'Morning'
           WHEN EXTRACT(HOUR FROM sighting_time) >= 12 AND EXTRACT(HOUR FROM sighting_time) < 17 THEN 'Afternoon'
           ELSE 'Evening'
       END AS time_of_day
FROM sightings
ORDER BY sighting_id;


-- problem - 9 | delete rangers who have never sighted any species
DELETE FROM rangers
WHERE ranger_id NOT IN (SELECT ranger_id FROM sightings);