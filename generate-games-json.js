// generate-games-json.js
const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'games');
const outputFile = path.join(gamesDir, 'games-list.json');

const folders = fs.readdirSync(gamesDir).filter(f => {
  return fs.statSync(path.join(gamesDir, f)).isDirectory();
});

const gamesList = folders.map(folder => {
  const files = fs.readdirSync(path.join(gamesDir, folder));
  // Pick first .jpg or .png (thumbnail.jpg will be detected)
  const thumbFile = files.find(f => f.endsWith('.jpg') || f.endsWith('.png'));
  return {
    folder,
    thumb: thumbFile ? `games/${folder}/${thumbFile}` : ''
  };
});

fs.writeFileSync(outputFile, JSON.stringify(gamesList, null, 2));
console.log(`Generated ${outputFile} with ${gamesList.length} games`);
