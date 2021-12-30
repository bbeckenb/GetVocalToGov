CREATE TYPE "states" AS ENUM ('AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY');
CREATE TABLE users (
    username VARCHAR(30) PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL 
        CHECK (position('@' IN email) > 1),
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state states NOT NULL,
    zip VARCHAR(30) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TYPE "category" AS ENUM ('environment', 'health care', 'defense');
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  post_id INTEGER
    REFERENCES posts(id) ON DELETE SET NULL,
  user_id VARCHAR(30) NOT NULL
    REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE favorites (
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id VARCHAR(30) NOT NULL
    REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
  template_id INTEGER NOT NULL
    REFERENCES templates(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, template_id)
);

CREATE TABLE bookmarks (
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id VARCHAR(30) NOT NULL
    REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
  post_id INTEGER NOT NULL
    REFERENCES posts(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, post_id)
);

