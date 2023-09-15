CREATE DATABASE IF NOT EXISTS Good_Morning;
USE Good_Morning;

CREATE TABLE IF NOT EXISTS Users (
    uuid CHAR(36) NOT NULL UNIQUE PRIMARY KEY,
    oAuth_key Char(36) UNIQUE,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS User_Settings (
    uuid CHAR(36) NOT NULL UNIQUE PRIMARY KEY,
    weather_cities TEXT,
    timezone_cities TEXT,
    dark_mode INT(1) DEFAULT 1
);

CREATE USER IF NOT EXISTS GM_User IDENTIFIED BY "password";
GRANT SELECT, INSERT, DELETE, UPDATE ON Good_Morning.Users TO GM_User;
GRANT SELECT, INSERT, DELETE, UPDATE ON Good_Morning.User_Settings TO GM_User;