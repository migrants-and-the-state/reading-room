
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Steps:
// 1. Read the prototype list and get aNumbers
// 2. Process NARA catalog data
// 3. Export afiles data
// 4. Process pages
// 5. Add OCR text to pages
// 6. Export pages data
// 7. Create pages directory and write individual page files
// 8. Process and export G325A forms
// 9. Process and export naturalization certificates


// Constants
const inDir         = './extracted-data/data';
const outDir        = './static/api';
const ocrDir        = path.join(inDir, 'page_ocr');
const naraFields    = ['LAST_NAME', 'FIRST_NAME', 'DOB', 'SEX', 'DOE', 'POE', 'COB', 'PFCO', 'DFO', 'NATZ_DATE', 'NATZ_LOCATION'];

// Helper function to deep compact objects
function deepCompact(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    if (Array.isArray(obj)) {
        const compacted = obj.filter(item => {
            return item !== null && item !== undefined && item !== '';
        }).map(deepCompact);
        return compacted.length ? compacted : null;
    }

    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        const compactedValue = deepCompact(value);
        if (compactedValue !== null && compactedValue !== undefined && 
            !(typeof compactedValue === 'object' && Object.keys(compactedValue).length === 0)) {
            result[key] = compactedValue;
        }
    }
    return Object.keys(result).length ? result : null;
}


// Read prototype list and get aNumbers
const prototypeData = fs.readFileSync(path.join(inDir, 'prototype_list.csv'), 'utf-8');
const prototype = parse(prototypeData, { columns: true });
const aNumbers = prototype.map(h => h.ANUMBER);

// Process NARA catalog data
const naraCatalogData = fs.readFileSync(path.join(inDir, 'nara_catalog.csv'), 'utf-8');
const naraAFiles = parse(naraCatalogData, { columns: true });

const afiles = naraAFiles.filter(afile => {
    const isWanted = aNumbers.includes(afile.ANUMBER);
    const jsonPath = path.join(inDir, 'afiles', `${afile.ANUMBER}.json`);
    return isWanted && fs.existsSync(jsonPath);
}).map(afile => {
    // Remove empty values
    Object.keys(afile).forEach(key => {
        if (!afile[key]) delete afile[key];
    });

    const msJson = JSON.parse(fs.readFileSync(
        path.join(inDir, 'afiles', `${afile.ANUMBER}.json`), 'utf-8'
    ));

    naraFields.forEach(field => {
        if (field in afile) {
            if (!msJson.fields[field.toLowerCase()]) {
                msJson.fields[field.toLowerCase()] = {};
            }
            msJson.fields[field.toLowerCase()].nara = afile[field];
        }
    });

    return deepCompact(msJson);
});

// Export afiles data
console.log(`writing data for ${afiles.length} afiles`);
fs.writeFileSync(
    path.join(outDir, 'index', 'afile.json'),
    JSON.stringify(afiles, null, 2)
);

// Process pages
const pagePaths = aNumbers.flatMap(anum => {
    const pattern = path.join(inDir, 'pages', `${anum}_*.json`);
    return fs.readdirSync(path.dirname(pattern))
        .filter(file => file.startsWith(anum))
        .map(file => path.join(path.dirname(pattern), file));
});

let pages = pagePaths.map(path => {
    const fileContent = fs.readFileSync(path, 'utf-8').replace(/NaN/g, 'null');
    return JSON.parse(fileContent);
});

// Add OCR text to pages
pages = pages.map(page => {
    const ocrPath = path.join(ocrDir, `${page.id}.txt`);
    if (fs.existsSync(ocrPath)) {
        page.full_text = fs.readFileSync(ocrPath, 'utf-8');
    }
    delete page.resources.ocr_exists;
    delete page.afile_id;
    return deepCompact(page);
});

// Export pages data
console.log(`writing data for ${pages.length} pages`);
fs.writeFileSync(
    path.join(outDir, 'index', 'page.json'),
    JSON.stringify(pages, null, 2)
);

// Create pages directory and write individual page files
if (!fs.existsSync(path.join(outDir, 'page'))) {
    fs.mkdirSync(path.join(outDir, 'page'), { recursive: true });
}
pages.forEach(page => {
    fs.writeFileSync(
        path.join(outDir, 'page', `${page.id}.json`),
        JSON.stringify(page, null, 2)
    );
});

// Process and export G325A forms
const g325as = pages.filter(page => page.is_g325a === true);
console.log(`writing data for ${g325as.length} g325as`);
fs.writeFileSync(
    path.join(outDir, 'index', 'g325a.json'),
    JSON.stringify(g325as, null, 2)
);

// Process and export naturalization certificates
const natcerts = pages.filter(page => page.is_cert_naturalization === true);
console.log(`writing data for ${natcerts.length} natcerts`);
fs.writeFileSync(
    path.join(outDir,'index', 'natcert.json'),
    JSON.stringify(natcerts, null, 2)
);