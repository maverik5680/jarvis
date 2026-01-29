// migrate-sidebar.js
import fs from 'fs';
import path from 'path';

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'asidebar.html');

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add viewport meta tag if missing
    if (!content.includes('name="viewport"')) {
        content = content.replace(
            /(<head>[\s\S]*?)(<title>| <meta charset=|<link)/i,
            '$1\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">$2'
        );
    }

    // 2. Add sidebar script if missing
    if (!content.includes('sidebar.js')) {
        content = content.replace(
            /(<link rel="stylesheet" href="\.\.\/ds\/src\/css\/main\.css">)/,
            '$1\n    <script src="./sidebar.js" type="module" defer></script>'
        );
    }

    // 3. Clean up sidebar if it's not a master file (asidebar.html)
    // We only empty sidebar in pages that should fetch it
    content = content.replace(
        /(<aside class="u-sidebar">)[\s\S]*?(<\/aside>)/,
        '$1$2'
    );

    // 4. Remove the mobile toggle script
    content = content.replace(
        /<script>[\s\S]*?const menuBtn = document\.getElementById\('menuBtn'\);[\s\S]*?sidebar\.classList\.toggle\('is-open'\);[\s\S]*?<\/script>/g,
        ''
    );

    fs.writeFileSync(filePath, content);
    console.log(`Migrated ${file}`);
});
