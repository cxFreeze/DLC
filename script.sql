DROP TABLE IF EXISTS persons;
CREATE TABLE `persons` (     `nconst` VARCHAR(100) NOT NULL,     `primaryName` VARCHAR(255),     `birthYear` VARCHAR(255),     `deathYear` VARCHAR(255),     `primaryProfession` VARCHAR(255),     `knownForTitles` VARCHAR(255),     PRIMARY KEY (`nconst`) );
LOAD DATA INFILE '/tmp/name.basics.tsv' INTO TABLE persons FIELDS TERMINATED BY '\t' IGNORE 1 LINES;

DROP TABLE IF EXISTS movies;
CREATE TABLE `movies` (     `tconst` VARCHAR(100) NOT NULL, `titleType` VARCHAR(255)	`primaryTitle` VARCHAR(255),	`originalTitle` VARCHAR(255),	`isAdult` VARCHAR(255),	`startYear` VARCHAR(255),	`endYear` VARCHAR(255),	`runtimeMinutes` VARCHAR(255),	`genres` VARCHAR(255),	`averageRating` VARCHAR(255),	`numVotes` VARCHAR(255),  PRIMARY KEY (`tconst`) );
LOAD DATA INFILE '/tmp/movieswithrate.csv' INTO TABLE movies FIELDS TERMINATED BY '\t' IGNORE 1 LINES;

DROP TABLE IF EXISTS principals;
CREATE TABLE `principals` ( `tconst` VARCHAR(100) NOT NULL, `ordering` VARCHAR(100) NOT NULL, `nconst` VARCHAR(100) NOT NULL, `category` VARCHAR(100) NOT NULL, `job` VARCHAR(100) NOT NULL, `characters` VARCHAR(100) NOT NULL);
--ALTER TABLE principals add foreign key (tconst) REFERENCES movies (tconst); --marche pas
--ALTER TABLE principals add foreign key (nconst) REFERENCES persons (nconst); --marche pas
LOAD DATA INFILE '/tmp/title.principals.tsv' INTO TABLE principals FIELDS TERMINATED BY '\t' IGNORE 1 LINES;
