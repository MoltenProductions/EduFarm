const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'games'); // /games folder
const outputFile = path.join(__dirname, 'games-list.json'); // output in root

try {
  const files = fs.readdirSync(gamesDir, { withFileTypes: true });

  const gameFolders = files
    .filter(f => f.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name)) // optional alphabetical sort
    .map(folder => {
      const folderPath = path.join(gamesDir, folder.name);

      let thumbs = [];
      try {
        thumbs = fs.readdirSync(folderPath)
          .filter(file => file.match(/\.(jpg|png)$/i));
      } catch(e) {
        console.warn(`Cannot read folder: ${folder.name}`);
      }

      const thumbFile = thumbs.find(f => f.toLowerCase().includes('thumbnail')) || thumbs[0] || '';

      return {
        folder: folder.name,
        thumb: thumbFile ? `games/${folder.name}/${thumbFile}` : 'default-thumbnail.png'
      };
    });

  fs.writeFileSync(outputFile, JSON.stringify(gameFolders, null, 2));
  console.log(`games-list.json successfully created with ${gameFolders.length} games!`);

} catch(err) {
  console.error('Error generating games list:', err);
}
