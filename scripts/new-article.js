#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const TOPICS = [
  { slug: 'ai-regulation',       label: 'AI & Regulation' },
  { slug: 'digital-governance',  label: 'Digital Governance' },
  { slug: 'data-privacy',        label: 'Data & Privacy' },
  { slug: 'govtech',             label: 'GovTech' },
  { slug: 'public-administration', label: 'Public Administration' },
  { slug: 'eu-policy',           label: 'EU Policy' },
  { slug: 'comparative-policy',  label: 'Comparative Policy' },
];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

function toSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function today() {
  return new Date().toISOString().split('T')[0];
}

async function main() {
  console.log('\nNew Article\n-----------');

  // Title
  let title = '';
  while (!title.trim()) {
    title = await ask('Title (required): ');
    if (!title.trim()) console.log('  Title cannot be empty.');
  }

  // Deck
  let deck = '';
  while (!deck.trim()) {
    deck = await ask('Deck/subtitle (required): ');
    if (!deck.trim()) console.log('  Deck cannot be empty.');
  }

  // Topic
  console.log('\nTopics:');
  TOPICS.forEach((t, i) => console.log(`  ${i + 1}. ${t.label}`));
  let topic;
  while (!topic) {
    const input = await ask('Pick a topic (1–7): ');
    const n = parseInt(input, 10);
    if (n >= 1 && n <= TOPICS.length) {
      topic = TOPICS[n - 1];
    } else {
      console.log('  Please enter a number between 1 and 7.');
    }
  }

  // Read time
  const readTimeInput = await ask('Read time in minutes (default: 5): ');
  const readTime = parseInt(readTimeInput, 10) || 5;

  rl.close();

  // Derive slug, date, filename
  const slug = toSlug(title);
  const date = today();
  const filename = `${date}-${slug}.md`;
  const filepath = path.join('src', 'articles', filename);
  const absPath = path.join(__dirname, '..', filepath);

  // Build frontmatter
  const content = `---
title: "${title}"
deck: "${deck}"
date: ${date}
topic: ${topic.slug}
topicLabel: "${topic.label}"
readTime: ${readTime}
tags:
  - ${topic.slug}
---

`;

  // Write file
  fs.writeFileSync(absPath, content, 'utf8');

  console.log(`\nCreated: ${filepath}`);

  // Open in VS Code
  exec(`code "${absPath}"`, (err) => {
    if (err) console.log('  (Could not open VS Code automatically.)');
  });
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
