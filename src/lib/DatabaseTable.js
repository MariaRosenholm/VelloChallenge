import fs from "fs";
import { networkInterfaces } from "os";

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
  static putDocument(document) {
    let uniqueId;
    let data;
    if (this.data === undefined) {
      data = JSON.parse(
        fs.readFileSync(
          `${process.cwd()}/data/${_tables.person.name}.json`,
          "utf-8"
        )
      );
    } else {
      data = this.data;
    }
    uniqueId = data.length++;

    let obj = {
      id: uniqueId,
      name: document.name,
      age: document.age,
      address: document.address,
      city: document.city,
    };

    let arr = [...data];
    arr.unshift(obj);
    arr.pop();

    fs.writeFileSync(
      `${process.cwd()}/data/${_tables.person.name}.json`,
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
  static getDocument(i) {
    let data;
    if (data === undefined) {
      data = JSON.parse(
        fs.readFileSync(
          `${process.cwd()}/data/${_tables.person.name}.json`,
          "utf-8"
        )
      );
    } else {
      data = this.data;
    }
    if (data.find(({ id }) => id === i) === undefined) {
      return null;
    } else {
      return data.find(({ id }) => id === i);
    }
  }

  /**
   * Update selected document.
   *
   * @param {number} id
   * @param {*} document
   * @returns {boolean} whether the operation succeeded
   */
  static updateDocument(changeId, document) {
    let data;
    if (this.data === undefined) {
      data = JSON.parse(
        fs.readFileSync(
          `${process.cwd()}/data/${_tables.person.name}.json`,
          "utf-8"
        )
      );
    } else {
      data = this.data;
    }

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

      const objIndex = data.findIndex((obj) => obj.id === changeId);

      let newArr = data.splice(objIndex, 1);
      let arr = [...data];
      arr.unshift(obj);
      arr.pop();

      fs.writeFileSync(
        `${process.cwd()}/data/${_tables.person.name}.json`,
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
  static deleteDocument(i) {
    let data;
    if (data === undefined) {
      data = JSON.parse(
        fs.readFileSync(
          `${process.cwd()}/data/${_tables.person.name}.json`,
          "utf-8"
        )
      );
    } else {
      data = this.data;
    }
    if (i) {
      const objIndex = data.findIndex((obj) => obj.id === i);
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
  static indexDocuments() {
    let data;
    if (data === undefined) {
      data = JSON.parse(
        fs.readFileSync(
          `${process.cwd()}/data/${_tables.person.name}.json`,
          "utf-8"
        )
      );
      return data.slice(0, 1);
    }
  }
}
