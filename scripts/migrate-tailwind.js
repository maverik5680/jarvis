const fs = require('fs');
const path = require('path');

const SHOWROOM_DIR = path.resolve(__dirname, '../design-showroom');

const mappings = {
    // Spacing
    'm-m-utility': 'm-m',
    'mt-m-utility': 'mt-m',
    'mb-m-utility': 'mb-m',
    'mx-auto-utility': 'mx-auto',
    'p-m-utility': 'p-m',
    'pt-m-utility': 'pt-m',
    'pb-m-utility': 'pb-m',
    'py-l-utility': 'py-l',
    'no-spacing-utility': 'm-0 p-0',

    // Display
    'block-utility': 'block',
    'inline-block-utility': 'inline-block',
    'inline-utility': 'inline',
    'flex-utility': 'flex',
    'inline-flex-utility': 'inline-flex',
    'grid-utility': 'grid',
    'none-utility': 'hidden',
    'block-desktop-utility': 'hidden md:block',
    'flex-desktop-utility': 'hidden md:flex',
    'block-mobile-utility': 'block md:hidden',
    'flex-mobile-utility': 'flex md:hidden',
    'hide-print-utility': 'print:hidden',
    'block-print-utility': 'print:block',

    // Typography
    'text-left-utility': 'text-left',
    'text-center-utility': 'text-center',
    'text-right-utility': 'text-right',
    'text-justify-utility': 'text-justify',
    'text-upper-utility': 'uppercase tracking-wide',
    'text-lower-utility': 'lowercase',
    'text-cap-utility': 'capitalize',
    'text-normal-utility': 'normal-case',
    'text-brand-utility': 'text-brand-orange',
    'text-white-utility': 'text-white',
    'text-muted-utility': 'text-gray-500',
    'text-error-utility': 'text-brand-error',
    'text-success-utility': 'text-brand-success',
    'text-truncate-utility': 'truncate',
    'text-nowrap-utility': 'whitespace-nowrap',
    'text-italic-utility': 'italic',
    'font-light-utility': 'font-light',
    'font-regular-utility': 'font-regular',
    'font-medium-utility': 'font-medium',
    'font-bold-utility': 'font-bold',

    // u-text-* mapping
    'u-text-h1': 'text-h1',
    'u-text-h2': 'text-h2',
    'u-text-h3': 'text-h3',
    'u-text-h4': 'text-h4',
    'u-text-body': 'text-body',
    'u-text-lg': 'text-h2', // Based on analysis

    // Borders & Radius
    'radius-none-utility': 'rounded-none',
    'radius-sm-utility': 'rounded-sm',
    'radius-md-utility': 'rounded-md',
    'radius-lg-utility': 'rounded-lg',
    'radius-xl-utility': 'rounded-xl',
    'radius-full-utility': 'rounded-full',
    'border-none-utility': 'border-0',
    'border-1-utility': 'border border-gray-200',
    'border-2-utility': 'border-2 border-gray-200',
    'border-t-1-utility': 'border-t border-gray-200',
    'border-b-1-utility': 'border-b border-gray-200',
    'border-l-1-utility': 'border-l border-gray-200',
    'border-r-1-utility': 'border-r border-gray-200',
    'border-brand-utility': 'border-brand-orange',
    'border-white-utility': 'border-white',
    'border-error-utility': 'border-brand-error',

    // Elevation (Shadows)
    'elevation-0-utility': 'shadow-none',
    'elevation-1-utility': 'shadow-elevation-1',
    'elevation-2-utility': 'shadow-elevation-2',
    'elevation-3-utility': 'shadow-elevation-3',
    'elevation-4-utility': 'shadow-elevation-4',
    'elevation-hover-utility': 'transition-shadow hover:shadow-elevation-2',
    'u-elevation-1': 'shadow-elevation-1',
    'u-elevation-2': 'shadow-elevation-2',
    'u-elevation-3': 'shadow-elevation-3',
};

function getAllHtmlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllHtmlFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });

    return arrayOfFiles;
}

const htmlFiles = getAllHtmlFiles(SHOWROOM_DIR);
console.log(`Found ${htmlFiles.length} HTML files.`);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Regex to match "class" attribute
    content = content.replace(/class=["']([^"']*)["']/g, (match, classNames) => {
        let classes = classNames.split(/\s+/);
        let updatedClasses = classes.map(cls => {
            if (mappings[cls]) {
                changed = true;
                return mappings[cls];
            }
            return cls;
        });

        // Remove duplicates and trim
        const uniqueClasses = [...new Set(updatedClasses)].join(' ').trim();
        return `class="${uniqueClasses}"`;
    });

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${path.basename(file)}`);
    }
});

console.log('Migration complete.');
