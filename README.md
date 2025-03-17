# Progetto 

Descrizione

Questo progetto implementa un'applicazione web per gestire un sistema di archivio prodotti. L'applicazione permette di:

- Visualizzare una lista di prodotti con possibilità di filtrarli per nome e per caratteristiche specifiche.

- Consultare una pagina dedicata al dettaglio completo di ciascun prodotto.

- Utilizzare moduli per l'inserimento e la modifica dei prodotti.

L'applicazione è responsive e fruibile sia su desktop che su dispositivi mobili.

## Stack Tecnologico

Il progetto è realizzato utilizzando:

- React 19 con Vite per l'ambiente di sviluppo e build.

- React Query (TanStack Query) per la gestione efficiente delle richieste API e dello stato del server.

- Axios per effettuare richieste HTTP.

- Supabase come backend as a service e gestione dei dati.

- React Router DOM per la navigazione tra pagine e rotte del progetto.

- Tailwind CSS per lo stile e layout responsive.

Struttura del Progetto

```
📦src
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂brand
 ┃ ┣ 📂layout
 ┃ ┣ 📂products
 ┃ ┣ 📂ui
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂lib
 ┣ 📂pages
 ┃ ┣ 📂admin
 ┃ ┗ 📂store
 ┣ 📂routes
 ┣ 📂schema
 ┣ 📂services
 ┃ ┣ 📂brands
 ┃ ┣ 📂categories
 ┃ ┣ 📂colors
 ┃ ┣ 📂images
 ┃ ┗ 📂products
 ┣ 📂store
 ┣ 📂styles
 ┣ 📂tests
 ┣ 📂types
 ┣ 📜App.css
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

## Avvio del Progetto

Installazione

npm install


## Variabili d'ambiente

Crea un file .env.local nella root del progetto con le seguenti variabili:

```
VITE_SUPABASE_URL=il-tuo-url-supabase
VITE_SUPABASE_ANON_KEY=la-tua-chiave-anonima-supabase
```

## Esecuzione in locale

npm run dev


## Testing

Sono presenti test di esempio utilizzando Jest e React Testing Library. Per eseguire i test:

npm run test
