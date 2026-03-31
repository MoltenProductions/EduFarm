// generate-games-json.js
const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'games');
const outputFile = path.join(gamesDir, 'games-list.json');

const gameFolders = fs.readdirSync(gamesDir).filter(f => {
  const fullPath = path.join(gamesDir, f);
  return fs.statSync(fullPath).isDirectory();
});

const gamesList = [];

gameFolders.forEach(folder => {
  const folderPath = path.join(gamesDir, folder);
  const files = fs.readdirSync(folderPath);
  const thumb = files.find(f => f.endsWith('.jpg') || f.endsWith('.png')) || 'placeholder.png';
  gamesList.push({ folder, thumb: `games/${folder}/${thumb}` });
});

fs.writeFileSync(outputFile, JSON.stringify(gamesList, null, 2));
console.log(`Generated games list with ${gamesList.length} entries at ${outputFile}`);
