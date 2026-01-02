const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/database.json');

// Initialize DB file if it doesn't exist
const initializeDb = () => {
    if (!fs.existsSync(path.dirname(dbPath))) {
        fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    }
    if (!fs.existsSync(dbPath)) {
        const initialData = {
            donations: []
        };
        fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    }
};

const readData = () => {
    initializeDb();
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
