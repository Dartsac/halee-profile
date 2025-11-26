#!/usr/bin/env node

/**
 * Auto-generate blog index.json file
 * This script scans the blog content folder for markdown files
 * and creates an index.json file listing all posts.
 * Runs automatically before each build.
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '../public/content/blog');
const INDEX_FILE = path.join(BLOG_DIR, 'index.json');

try {
  // Ensure blog directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    console.log('Blog directory does not exist yet, creating empty index...');
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    fs.writeFileSync(INDEX_FILE, JSON.stringify([], null, 2));
    console.log('✓ Created empty blog index');
    process.exit(0);
  }

  // Read all files in the blog directory
  const files = fs.readdirSync(BLOG_DIR);

  // Filter for markdown files only (exclude index.json and other files)
  const markdownFiles = files
    .filter(file => file.endsWith('.md'))
    .sort() // Sort alphabetically (which puts dates in order since format is YYYY-MM-DD-slug.md)
    .reverse(); // Reverse to get newest first

  // Write the index file
  fs.writeFileSync(INDEX_FILE, JSON.stringify(markdownFiles, null, 2) + '\n');

  console.log(`✓ Generated blog index with ${markdownFiles.length} post(s)`);
  if (markdownFiles.length > 0) {
    console.log('  Posts:', markdownFiles.join(', '));
  }

  process.exit(0);
} catch (error) {
  console.error('✗ Error generating blog index:', error.message);
  process.exit(1);
}
