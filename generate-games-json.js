const fs = require('fs');
const path = require('path');

// Path to your /games folder
const gamesDir = path.join(__dirname, 'games');

// Output JSON file (in root)
const outputFile = path.join(__dirname, 'games-list.json');

fs.readdir(gamesDir, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error reading games folder:', err);
    return;
  }

  const gameFolders = files
    .filter(f => f.isDirectory()) // Only folders
    .map(folder => {
      const folderPath = path.join(gamesDir, folder.name);

      // Find first thumbnail file: jpg or png
      const thumbs = fs.readdirSync(folderPath)
        .filter(file => file.match(/\.(jpg|png)$/i));

      // Prefer files with 'thumbnail' in name
      const thumbFile = thumbs.find(f => f.toLowerCase().includes('thumbnail')) || thumbs[0] || '';

      return {
        folder: folder.name,
        thumb: thumbFile ? `games/${folder.name}/${thumbFile}` : ''
      };
    });

  fs.writeFileSync(outputFile, JSON.stringify(gameFolders, null, 2));
  console.log('games-list.json created with', gameFolders.length, 'games.');
});
