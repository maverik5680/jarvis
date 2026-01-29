// migrate-sidebar.js
import fs from 'fs';
import path from 'path';

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'asidebar.html' && f !== 'index.html' && f !== 'colors.html');

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add script to head (after main.css link)
    if (!content.includes('sidebar.js')) {
        content = content.replace(
            /(<link rel="stylesheet" href="\.\.\/ds\/src\/css\/main\.css">)/,
            '$1\n    <script src="./sidebar.js" type="module" defer></script>'
        );
    }

    // 2. Empty the sidebar
    content = content.replace(
        /(<aside class="u-sidebar">)[\s\S]*?(<\/aside>)/,
        '$1$2'
    );

    // 3. Remove the mobile toggle script
    // This matches the common pattern found in most files
    content = content.replace(
        /<script>[\s\S]*?const menuBtn = document\.getElementById\('menuBtn'\);[\s\S]*?sidebar\.classList\.toggle\('is-open'\);[\s\S]*?<\/script>/g,
        ''
    );

    fs.writeFileSync(filePath, content);
    console.log(`Migrated ${file}`);
});
