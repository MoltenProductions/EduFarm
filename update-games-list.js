// update-games-list.js
const fs = require('fs');
const path = require('path');

// Path to your games folder
const gamesDir = path.join(__dirname, 'games');
const jsonPath = path.join(gamesDir, 'games-list.json');

// Read all subfolders
const folders = fs.readdirSync(gamesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Optional: log thumbnails found
const gamesWithThumbs = folders.map(folder => {
  const folderPath = path.join(gamesDir, folder);
  const files = fs.readdirSync(folderPath);
  const thumb = files.find(f => f.toLowerCase() === 'thumbnail.jpg' || f.toLowerCase() === 'thumbnail.png');
  if (!thumb) console.warn(`⚠️  No thumbnail found for "${folder}"`);
  return folder;
});

// Write JSON file
fs.writeFileSync(jsonPath, JSON.stringify(gamesWithThumbs, null, 2));
console.log(`✅ games-list.json updated with ${gamesWithThumbs.length} games.`);
