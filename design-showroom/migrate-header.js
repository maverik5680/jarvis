// migrate-header.js
import fs from 'fs';
import path from 'path';

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'asidebar.html' && f !== 'aheader.html');

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove content and inline styles from the header
    // We target the u-header class and clear its contents/style
    content = content.replace(
        /(<header class="u-header")[^>]*?>[\s\S]*?<\/header>/,
        '$1></header>'
    );

    fs.writeFileSync(filePath, content);
    console.log(`Migrated header in ${file}`);
});
