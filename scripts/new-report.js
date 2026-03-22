#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const TOPICS = [
  { slug: 'ai-regulation',         label: 'AI & Regulation' },
  { slug: 'digital-governance',    label: 'Digital Governance' },
  { slug: 'data-privacy',          label: 'Data & Privacy' },
  { slug: 'govtech',               label: 'GovTech' },
  { slug: 'public-administration', label: 'Public Administration' },
  { slug: 'eu-policy',             label: 'EU Policy' },
  { slug: 'comparative-policy',    label: 'Comparative Policy' },
];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

function toSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function currentYear() {
  return new Date().getFullYear();
}

function nextReportNumber(reportsDir) {
  const files = fs.existsSync(reportsDir) ? fs.readdirSync(reportsDir).filter(f => f.endsWith('.md')) : [];
  return String(files.length + 1).padStart(2, '0');
}

async function main() {
  console.log('\nNew Report\n----------');

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

  // Additional topic
  const additionalTopic = await ask('Additional topic/subtitle (optional, e.g. "Energy Policy · Industrial Economics"): ');

  // Pages
  const pagesInput = await ask('Number of pages (default: 0): ');
  const pages = parseInt(pagesInput, 10) || 0;

  rl.close();

  // Derive slug, date, filename, report number
  const slug = toSlug(title);
  const date = today();
  const year = currentYear();
  const filename = `${date}-${slug}.md`;
  const reportsDir = path.join(__dirname, '..', 'src', 'reports');
  const reportNumber = nextReportNumber(reportsDir);
  const absPath = path.join(reportsDir, filename);
  const filepath = path.join('src', 'reports', filename);

  // Build frontmatter
  const additionalTopicLine = additionalTopic.trim()
    ? `additionalTopic: "${additionalTopic.trim()}"\n`
    : '';

  const content = `---
title: "${title}"
deck: "${deck}"
date: ${date}
topic: ${topic.slug}
topicLabel: "${topic.label}"
${additionalTopicLine}reportNumber: "${reportNumber}"
reportYear: ${year}
pages: ${pages}
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
