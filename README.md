# projet-back (API)

Bonjour,
Voici un exemple de projet back (API) pour la prise de commandes de produits via un site Internet. Les commandes peuvent être livrées à des lieux de livraison prédéfinis et à des dates qui leur sont associées.

3 types d'utilisateurs = visiteurs, clients connectés et administrateurs.

Les produits appartiennent à une gamme de produits.
Les utilisateurs passent commande en sélectionnant un ou des produits, un lieu de livraison et une ou des dates de livraison (associées au lieu).


## Dependencies installation
```bash
npm install
```

## Create .env file

Copy the .env-example file and rename it to .env
Replace the values of the environment variables with your own values

## Create database with Postgresql

```bash
sudo -i -u postgres psql

CREATE ROLE "user_name" WITH LOGIN PASSWORD 'password';

CREATE DATABASE "database_name" WITH owner "user_name";

Exit
```

## Create table
```bash
psql -U user -d database -f data/createTable.sql

or 

run the npm script = db:create 
```


## Launch the Server
```bash
node . 

or 

run npm script : start
```