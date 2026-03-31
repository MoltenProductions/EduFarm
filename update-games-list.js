const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'games');
const outputFile = path.join(gamesDir, 'games-list.json');

// Get all folders in /games
const folders = fs.readdirSync(gamesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Build list of games with first image in each folder
const gameList = folders.map(folder => {
  const files = fs.readdirSync(path.join(gamesDir, folder));
  const thumbFile = files.find(f => /\.(png|jpg|jpeg)$/i.test(f));
  return {
    folder,
    thumb: thumbFile ? `games/${folder}/${thumbFile}` : ''
  };
});

// Save to games-list.json
fs.writeFileSync(outputFile, JSON.stringify(gameList, null, 2));
console.log('games-list.json updated!');
