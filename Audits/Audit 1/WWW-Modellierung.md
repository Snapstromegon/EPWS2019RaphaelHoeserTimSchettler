# Erste Modellierungen und Modellierungsbegründungen

## Komponenten

### Nutzerverwaltung

Die Nutzerverwaltung ist für die Speicherung und Verwaltung der Daten zuständig.

### Attackgenerator

Diese Komponente erstellt für einen beliebigen Nutzer einen mehr oder weniger geziehlten Fakeangriff mit Hilfe der Submodul Generatoren.

### Submodul Generatoren

#### Mail

Erzeugt und versendet Mail Angriffe

#### Werbeanzeige

Erzeugt Fake Werbeanzeigen und stellt diese bereit.

## Nutzung

Die Clients des Nutzers kommunizieren direkt oder indirekt mit der Nutzerverwaltung, welche die entsprechenden Änderungen im System vornimmt (Punktestand und Metriken anpassen / neue Angriffe generieren).

### Browser

Über den Browser meldet sich der Nutzer an und kann ab da an echte Werbeanzeigen gegen Fake Anzeigen ersetzt bekommen. Diese müssen im Portal gemeldet werden (z.B. über die URL).

### Mail

Wenn der Nutzer sich angemeldet hat, bekommt er an sein Mailkonto generierte Angriffe geschickt, welche er z.B. über die Absendeadresse oder durch weiterleiten an eine Systemadresse melden kann.

## Begründungen

Diese Komponententrennung erlaubt eine leichte Ausbaubarkeit und ermöglicht es einzelne Komponenten getrennt zu betrachten und entwickeln.