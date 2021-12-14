CREATE TABLE users (
    username VARCHAR(30) PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL 
        CHECK (position('@' IN email) > 1),
    address TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TYPE "category" AS ENUM ('environment', 'health care', 'defense');
CREATE TYPE "states" AS ENUM ('USA', 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY');
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  link TEXT,
  body TEXT NOT NULL,
  user_id VARCHAR(30) NOT NULL
    REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
  tag category NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "location" states NOT NULL
);

CREATE TABLE templates (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  post_id INTEGER
    REFERENCES posts(id) ON DELETE SET NULL,
  user_id VARCHAR(30) NOT NULL
    REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE favorites (
  user_id VARCHAR(30) NOT NULL
    REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
  template_id INTEGER NOT NULL
    REFERENCES templates(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, template_id)
);

CREATE TABLE bookmarks (
  user_id VARCHAR(30) NOT NULL
    REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
  post_id INTEGER NOT NULL
    REFERENCES posts(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, post_id)
);

