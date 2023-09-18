import fs from "fs";

const _tables = {};

export default class DatabaseTable {
  static getInstance(name, data) {
    if (!_tables[name]) _tables[name] = new DatabaseTable(name, data);

    return _tables[name];
  }

  constructor(name, data) {
    if (!name) throw new Error("Name must be specified");
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
        this.data = JSON.parse(fs.readFileSync(fileDir, "utf-8"));
      } catch (err) {
        console.log("ERROR WHEN LOADING DATA!", `Does ${fileDir} exist?`, "\n");
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
    let uniqueId = this.data.length++;
    let obj = {
      id: uniqueId,
      name: document.name,
      age: document.age,
      address: document.address,
      city: document.city,
    };
    fs.writeFileSync(fileDir, JSON.stringify(this.data.push(obj), null, 2));
    return obj;
  }

  /**
   * Get selected document.
   *
   * @param {number} id
   * @returns {document | null} document or null if not found
   */
  getDocument(i) {
    if (this.data.find(({ id }) => id === i) === undefined) {
      return null;
    } else {
      return this.data.find(({ id }) => id === i);
    }
  }

  /**
   * Update selected document.
   *
   * @param {number} id
   * @param {*} document
   * @returns {boolean} whether the operation succeeded
   */
  updateDocument(i, document) {
    if (i & document) {
      let obj = this.data.find(({ id }) => id === i);
      obj = document;
      let newArr = this.data.splice(this.data.map((i) => i.id).indexOf(i), 1);
      fs.writeFileSync(fileDir, JSON.stringify(newArr.push(obj), null, 2));
      return "New document added!";
    } else {
      return "Error!";
    }
  }

  /**
   * Delete selected document.
   *
   * @param {number} id
   * @returns {boolean} whether the operation succeeded
   */
  deleteDocument(i) {
    if (i) {
      let newArr = this.data.splice(this.data.map((i) => i.id).indexOf(i), 1);
      fs.writeFileSync(fileDir, JSON.stringify(newArr, null, 2));
      return "The document with id" + i + " deleted!";
    } else {
      return "Error!";
    }
  }

  /**
   * Get documents based on limit and offset.
   *
   * @param {number} limit
   * @param {number} offsetId
   * @returns {document[]}
   */
  indexDocuments(limit, offsetId) {
    return this.data.slice(offsetId, limit);
  }
}
