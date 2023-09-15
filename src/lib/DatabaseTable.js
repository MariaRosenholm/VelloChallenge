import fs from 'fs';

const _tables = {};

export default class DatabaseTable {
  static getInstance(name, data) {
    if (!_tables[name]) _tables[name] = new DatabaseTable(name, data);

    return _tables[name];
  }

  constructor(name, data) {
    if (!name) throw new Error('Name must be specified');
    if (_tables[name]) {
      throw new Error(`DatabaseTable ${name} has already been initialized`);
    }

    const fileDir = `${process.cwd()}/data/${name}.json`;

    this.name = name;

    // For test purposes, we allow passing data.
    if (data) {
      this.data = data;
    } else {
      try {
        this.data = JSON.parse(fs.readFileSync(fileDir, 'utf-8'));
      } catch (err) {
        console.log('ERROR WHEN LOADING DATA!', `Does ${fileDir} exist?`, '\n');
        throw err;
      }
    }
  }

  /**
   * Add document to table.
   * 
   * @param {document} document 
   * @returns {document} the created document, including a new unique ID
   */
  putDocument(document) {
    throw new Error('Not implemented');
  }

  /**
   * Get selected document.
   * 
   * @param {number} id 
   * @returns {document | null} document or null if not found 
   */
  getDocument(id) {
    throw new Error('Not implemented');
  }

  /**
   * Update selected document.
   * 
   * @param {number} id 
   * @param {*} document 
   * @returns {boolean} whether the operation succeeded
   */
  updateDocument(id, document) {
    throw new Error('Not implemented');
  }

  /**
   * Delete selected document.
   * 
   * @param {number} id 
   * @returns {boolean} whether the operation succeeded
   */
  deleteDocument(id) {
    throw new Error('Not implemented');
  }

  /**
   * Get documents based on limit and offset.
   * 
   * @param {number} limit 
   * @param {number} offsetId 
   * @returns {document[]}
   */
  indexDocuments(limit, offsetId) {
    throw new Error('Not implemented');
  }
}
