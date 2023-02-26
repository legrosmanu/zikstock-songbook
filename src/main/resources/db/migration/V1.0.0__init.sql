CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS zikresources;

CREATE TABLE zikresources
(
    _id uuid DEFAULT uuid_generate_v4 (),
    url VARCHAR(1000) NOT NULL,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255),
    PRIMARY KEY (_id)
);