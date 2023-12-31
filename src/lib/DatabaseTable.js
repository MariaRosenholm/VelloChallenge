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
      let arr = [data];
      fs.writeFileSync(
        `${process.cwd()}/data/${this.name}.json`,
        JSON.stringify(arr, null, 2)
      );
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
    let data = fs.readFileSync(
      `${process.cwd()}/data/${this.name}.json`,
      "utf-8"
    );

    if (data.length !== 0) data = JSON.parse(data);

    let arr = [];
    let obj = {
      id: Math.floor(
        Math.random() * (100000 - data.length + 1) + data.length + 1
      ),
      name: document.name,
      age: document.age,
      address: document.address,
      city: document.city,
    };

    if (data.length === 0) {
      arr.push(obj);
    } else {
      arr = [...data];
      arr.unshift(obj);
      arr.pop();
    }

    fs.writeFileSync(
      `${process.cwd()}/data/${this.name}.json`,
      JSON.stringify(arr, null, 2)
    );
    return obj;
  }

  /**
   * Get selected document.
   *
   * @param {number} id
   * @returns {document | null} document or null if not found
   */
  getDocument(i) {
    let data = fs.readFileSync(
      `${process.cwd()}/data/${this.name}.json`,
      "utf-8"
    );

    if (data.length !== 0) data = JSON.parse(data);

    if (data.length === 0 || i === undefined) {
      return null;
    } else {
      if (data.find(({ id }) => id === parseInt(i)) === undefined) {
        return null;
      } else {
        return data.find(({ id }) => id === parseInt(i));
      }
    }
  }

  /**
   * Update selected document.
   *
   * @param {number} id
   * @param {*} document
   * @returns {boolean} whether the operation succeeded
   */
  updateDocument(changeId, document) {
    let arr = [];
    let data = fs.readFileSync(
      `${process.cwd()}/data/${this.name}.json`,
      "utf-8"
    );

    if (data.length !== 0) data = JSON.parse(data);

    if (changeId && document) {
      let obj = this.getDocument(changeId);
      if (document.name) {
        obj.name = document.name;
      }
      if (document.age) {
        obj.age = document.age;
      }
      if (document.address) {
        obj.address = document.address;
      }
      if (document.city) {
        obj.city = document.city;
      }

      const objIndex = data.findIndex((obj) => obj.id === parseInt(changeId));
      data.splice(objIndex, 1);

      if (data.length === 0) {
        arr.push(obj);
      } else {
        arr = [...data];
        arr.unshift(obj);
        arr.pop();
      }

      fs.writeFileSync(
        `${process.cwd()}/data/${this.name}.json`,
        JSON.stringify(arr, null, 2)
      );
      return true;
    } else {
      return false;
    }
  }

  /**
   * Delete selected document.
   *
   * @param {number} id
   * @returns {boolean} whether the operation succeeded
   */
  deleteDocument(i) {
    let data = fs.readFileSync(
      `${process.cwd()}/data/${this.name}.json`,
      "utf-8"
    );

    if (data.length !== 0) data = JSON.parse(data);

    if (i) {
      const objIndex = data.findIndex((obj) => obj.id === parseInt(i));
      let newArr = data.splice(objIndex, 1);
      fs.writeFileSync(
        `${process.cwd()}/data/${_tables.person.name}.json`,
        JSON.stringify(data, null, 2)
      );
      return true;
    } else {
      return false;
    }
  }

  /**
   * Get documents based on limit and offset.
   *
   * @param {number} limit
   * @param {number} offsetId
   * @returns {document[]}
   */
  indexDocuments() {
    let data = fs.readFileSync(
      `${process.cwd()}/data/${this.name}.json`,
      "utf-8"
    );

    if (data.length !== 0) return JSON.parse(data).slice(0, 1);

    return undefined;
  }
}
