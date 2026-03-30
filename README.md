# Voussoir

Rivista indipendente di analisi delle politiche pubbliche.

## Setup iniziale

Apri il terminale nella cartella del progetto ed esegui:

```bash
npm install
```

## Avviare il sito in locale

```bash
npm start
```

Il sito sarà visibile su `http://localhost:8080`

## Pubblicare un nuovo articolo

1. Crea un nuovo file nella cartella `src/articoli/`
2. Nominalo in modo descrittivo, es. `riforma-sanitaria-2025.md`
3. Copia questo template all'inizio del file:

```markdown
---
layout: layouts/articolo.njk
title: Il titolo del tuo articolo
sottotitolo: Una frase che riassume l'articolo (usata come abstract breve e nei preview)
tema: Governance europea
autore: Giovanni Perrini
ruolo_autore: Policy analyst · MA Economics & Communication, USI Lugano
date: 2025-03-15
peer_reviewed: false
tags:
  - Tag 1
  - Tag 2
note:
  - "Autore, A. (2024). <em>Titolo</em>. Editore."
---

Il testo dell'articolo va qui, scritto in Markdown.
```

4. Scrivi l'articolo in Markdown sotto il blocco `---`
5. Salva il file
6. Fai `git push` — Cloudflare Pages aggiornera il sito automaticamente dopo il build

## Sintassi Markdown essenziale

```markdown
## Titolo di sezione

**testo in grassetto**

*testo in corsivo*

> Citazione o pull quote

Testo normale con nota a piè di pagina<sup>1</sup>
```

## Struttura del progetto

```
voussoir/
├── src/
│   ├── _includes/
│   │   └── layouts/
│   │       ├── base.njk        ← header e footer comuni
│   │       └── articolo.njk    ← template pagina articolo
│   ├── articoli/               ← ogni .md è un articolo
│   ├── analisi/
│   │   └── index.njk           ← lista di tutti gli articoli
│   ├── css/
│   │   └── style.css           ← tutto il design di Voussoir
│   ├── img/
│   │   └── favicon.svg
│   └── index.njk               ← home page
├── .eleventy.js                ← configurazione Eleventy
├── wrangler.toml               ← configurazione Cloudflare Pages
└── package.json
```

## Deploy su Cloudflare Pages

1. Carica questa cartella su GitHub
2. Vai su dash.cloudflare.com → Workers & Pages → "Create application" → "Pages" → "Connect to Git"
3. Seleziona il tuo repository
4. Imposta build command su `npm run build`
5. Imposta build output directory su `_site`
6. Salva e fai il primo deploy
7. Da questo momento ogni `git push` sul branch collegato sincronizza automaticamente il sito

## Deploy manuale via CLI (opzionale)

Se vuoi forzare una sincronizzazione immediata dal terminale:

```bash
npx wrangler login
export CLOUDFLARE_PAGES_PROJECT=il-tuo-project-name
npm run cf:deploy
```

Per deploy in produzione sul branch `main`:

```bash
npm run cf:deploy:prod
```
