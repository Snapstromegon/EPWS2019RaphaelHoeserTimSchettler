# Installation

## NodeJS installieren

Installiere nodejs current von [https://nodejs.org/en/](https://nodejs.org/en/) inklusive der Node Buildtools um node gyp for argon2 zu erhalten.

## Module installieren

```
npm install
```

## Config anpassen

Folgende Dateien entsprechend anpassen (normal von der example_config.js übernehmen)
- ./config.js
- ./config/config.js

## Datenbank initialisieren

```
npm run resetDB
```

## System starten

```
node .
```

# Nutzung

Folgende Pfade stehen zur Verfügung:

- http://localhost:88/user/:userId Übersicht eines Nutzers
- http://localhost:88/admin Liste aller Nutzer

Alle weiteren Sachen sind hieraus verlinkt