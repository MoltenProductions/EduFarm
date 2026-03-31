const fs = require('fs');
const path = require('path');

// Path to your /games folder
const gamesDir = path.join(__dirname, 'games');

// Output JSON in repo root
const outputFile = path.join(__dirname, 'games-list.json');

// Read the /games folder
fs.readdir(gamesDir, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error reading games folder:', err);
    return;
  }

  const gameFolders = files
    .filter(f => f.isDirectory()) // Only folders
    .map(folder => {
      const folderPath = path.join(gamesDir, folder.name);

      // Look for first thumbnail file: jpg or png
      const thumbs = fs.readdirSync(folderPath)
        .filter(file => file.match(/\.(jpg|png)$/i));

      // Prefer thumbnail.jpg or thumbnail.png
      const thumbFile = thumbs.find(f => f.toLowerCase().includes('thumbnail')) || thumbs[0] || '';

      return {
        folder: folder.name,
        thumb: thumbFile ? `games/${folder.name}/${thumbFile}` : 'default-thumbnail.png'
      };
    });

  console.log('Found', gameFolders.length, 'games.');
  console.log('Writing to:', outputFile);

  fs.writeFileSync(outputFile, JSON.stringify(gameFolders, null, 2));
  console.log('games-list.json successfully created in repo root!');
});
