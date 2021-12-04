\echo 'Delete and recreate get_vocal_to_gov_db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE get_vocal_to_gov_db;
CREATE DATABASE get_vocal_to_gov_db;
\connect get_vocal_to_gov_db

\i getVocalToGov_Schema.sql
-- \i jobly-seed.sql

\echo 'Delete and recreate get_vocal_to_gov_db_test?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE get_vocal_to_gov_db_test;
CREATE DATABASE get_vocal_to_gov_db_test;
\connect get_vocal_to_gov_db_test

\i getVocalToGov_Schema.sql