import fs from 'fs';

let data;

/**
 * TODO
 * 
 * Import the data from ./data-sources/person.csv to ./data/person.json
 * It's up to you to choose how you would like to do that.
 */

fs.writeFileSync('./data/person.json', JSON.stringify(data, null, 2));
