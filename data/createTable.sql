-- SQLBook: Code
BEGIN;

DROP TABLE IF EXISTS "product_has_order", "order", "product", "product_categorie", "place_has_date", "delivery_date", "delivery_place", "user";
DROP DOMAIN IF EXISTS "zip_code", "posit_int", "posit_numeric";

CREATE DOMAIN "posit_numeric" AS numeric(15,4) CHECK (value >= 0);
CREATE DOMAIN "posit_int" AS integer CHECK (value >= 0);

 CREATE DOMAIN "zip_code" AS TEXT CHECK (
    value ~ '^0[1-9]\d{3}$' -- zip_code (metropole) from 01 to 09
    OR value ~ '^[1-8]\d{4}$' -- zip_code (metropole) from 10 to 89
    OR value ~ '^9[0-59]\d{3}$' -- zip_code (metropole) from 90 to 95
    OR value ~ '^97[1-8]\d{2}$' -- DOM
    OR value ~ '^98[046-9]\d{2}$' -- TOM + Monaco
    OR value ~ '^00000$');

CREATE TABLE IF NOT EXISTS "user" (
"id" INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
"last_name" TEXT NOT NULL,
"first_name" TEXT NOT NULL,
"email" TEXT UNIQUE NOT NULL CHECK("email" ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'),
"password" TEXT NOT NULL,
"phone" VARCHAR(10) NOT NULL CHECK ("phone" ~ '(^0[1-9][0-9]{8}$)'),
"adress" TEXT NOT NULL,
"zip_code" zip_code NOT NULL,
"city" TEXT NOT NULL,
"status" BOOLEAN NOT NULL DEFAULT FALSE,
"role" TEXT NOT NULL DEFAULT 'client',
"agreement" BOOLEAN NOT NULL DEFAULT FALSE,
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "delivery_place" (
"id" INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
"name" TEXT NOT NULL UNIQUE,
"adress" TEXT NOT NULL,
"zip_code" zip_code NOT NULL,
"city" TEXT NOT NULL,
"information" TEXT NOT NULL,
"status" BOOLEAN NOT NULL DEFAULT TRUE,
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "delivery_date" (
"id" INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
"date" TIMESTAMPTZ NOT NULL UNIQUE,
"status" BOOLEAN NOT NULL DEFAULT TRUE,
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ
);


CREATE TABLE IF NOT EXISTS "place_has_date" (
  "id" INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
  "delivery_date_id" posit_int NOT NULL REFERENCES "delivery_date"("id"),
  "delivery_place_id" posit_int NOT NULL REFERENCES "delivery_place"("id"),
UNIQUE ("delivery_date_id", "delivery_place_id"),
  "status" BOOLEAN NOT NULL DEFAULT TRUE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);


CREATE TABLE IF NOT EXISTS "product_category" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"name" TEXT NOT NULL UNIQUE,
"description" TEXT NOT NULL,
"photo" TEXT NOT NULL,
"status" BOOLEAN NOT NULL DEFAULT TRUE,
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "product" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"weight" posit_int NOT NULL,
"price" posit_numeric NOT NULL,
"product_category_id" INTEGER NOT NULL REFERENCES "product_category"("id"),
UNIQUE ("weight","product_category_id"),
"status" BOOLEAN NOT NULL DEFAULT TRUE,
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "order" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"creator_id" INTEGER NOT NULL REFERENCES "user"("id"),
"customer_id" INTEGER NOT NULL REFERENCES "user"("id"),
"delivery_place_id" INTEGER NOT NULL REFERENCES "delivery_place"("id"),
"delivery_date_id" INTEGER NOT NULL REFERENCES "delivery_date"("id"),
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "product_has_order" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"product_id" INTEGER NOT NULL REFERENCES "product"("id"),
"order_id" INTEGER NOT NULL REFERENCES "order"("id") ON DELETE CASCADE,
UNIQUE ("product_id","order_id"),
"quantity" posit_int NOT NULL,
"price" posit_numeric NOT NULL, 
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ
);

COMMIT;
