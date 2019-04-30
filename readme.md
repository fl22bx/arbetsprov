# Arbetsprov

Github:
https://github.com/fl22bx/arbetsprov/settings

## Förkrav
* Internet Anslutning för att kommunicera med M-Lab Mongo DB service
* Npm och Node installerat (https://nodejs.org/en/)
* port 3000 ledig

## Konfiguration
För att ändra port: <br/>
* Öppna backend/app.js
* Ändra const port till önskad port
<br/>
Idag består databasen av en playground uppkoppling till Mlab, en databas service för MongoDB. Som fungerar utmärkt för 
testning av applikationen <br/>

För att byta MongoDb databas: <br/>
* öppna backend/src/dbConfig
* ändra const connectionString till egen connectionstring

## steg för att starta applikationen

* Öppna mappen backend i terminalen
* kör npm install --production 
* kör npm start

ToDo applikationen finns då på: <br/>
http://localhost:3000/ <br/>
<br/>
För att testa graphql via Graphiql playground: <br/>
http://localhost:3000/graphql

## Personliga reflektioner

Jag är väldigt nöjd med valet av GraphQL till denna applikation, det gav mig ett lätt sätt att kommunicera med min backend och var enkelt att implementera. Samt det gav mig möjlighet att testa på det även på klientsidan med react. Det är väldigt smidigt att ha Graphiql (http://localhost:3000/graphql) för att kunna testa sin backend fristående från klienten. Så det jag är mest stolt över är GraphQl, väldigt enkelt att skapa fullvärdig CRUD funktionalitet

Jag är även väldigt nöjd med att fått chansen att lösa problemen med react hooks, detta är första gången jag använder mig av dem och även detta var en smidig upplevelse.


