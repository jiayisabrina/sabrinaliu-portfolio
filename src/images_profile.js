# Install the base64 conversion tool (if needed)
node -e "
const fs = require('fs');
const data = fs.readFileSync('path/to/Users/sabrinabi/Downloads/IMG_1950.JPG);
const b64 = data.toString('base64');
fs.writeFileSync('src/images_profile.js', 'const PROFILE_PHOTO = \"data:image/jpeg;base64,' + b64 + '\";\nexport default PROFILE_PHOTO;');
console.log('Done!');
"