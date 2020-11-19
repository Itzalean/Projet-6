# Projet-6
Créez un réseau social d’entreprise

## Prérequis
Pour fonctionner, ce projet nécessite certaines dépendances :
  - Node.js
  - Un serveur MariaDB (ou Mysql au pire) fonctionnel (donc, MariaDB)

## Téléchargement
```sh
$ git clone https://github.com/Itzalean/Projet-6.git
```

## Configuration
Dans le répertoire backend/config se trouvent deux fichiers de configuration :
 - db.config.js
Permet de configurer la connexion à la base de données. Adaptez-la en fonction de votre configuration.
Remarque : La base de données et les tables seront créées automatiquement au lancement du serveur. Par contre, il faut que l'utilisateur ait des droits suffisants pour cela (privilège CREATE)
 - private.key
Contient la _"clé secrète"_ pour la génération des tokens avec [JSON Web Token (JWT)](https://fr.wikipedia.org/wiki/JSON_Web_Token)

## Installation
Le projet est divisé en deux parties : le backend et le frontend. Chaque partie nécessite certaines manipulations.
Placez-vous dans le répertoire du projet, puis :
```sh
$ cd backend
$ npm install
$ mkdir images
$ node server &
$ cd ../frontend
$ npm install
$ npm run serve &
```
(Procédure à adapter en fonction de l'OS)
## Accès à l'application
L'application, une fois démarrée, est accessible dans votre navigateur sur le port 4000 : http://localhost:4000/
