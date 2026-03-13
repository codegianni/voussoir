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
6. Fai `git push` — Netlify aggiornerà il sito automaticamente in ~30 secondi

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
├── netlify.toml                ← configurazione deployment
└── package.json
```

## Deploy su Netlify

1. Carica questa cartella su GitHub
2. Vai su netlify.com → "Add new site" → "Import from Git"
3. Seleziona il tuo repository
4. Netlify legge automaticamente `netlify.toml` — non devi configurare nulla
5. Collega il dominio IONOS dalle impostazioni del sito su Netlify
