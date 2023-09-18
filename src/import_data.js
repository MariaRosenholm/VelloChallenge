import fs from "fs";

import { parse } from "csv-parse";

let dataToJSON = [];
let data = [];
let arrays = [[], [], [], [], []];
let rawData = [];

const readData = new Promise((resolve, reject) => {
  fs.createReadStream("./data-sources/person.csv")
    .pipe(parse())
    .on("data", (row) => {
      let r = JSON.stringify(row, null, 2).split(";");
      for (let i = 0; i < r.length + 1; i++) {
        rawData.push(r[i]);
      }
      resolve("Data fetched!");
    });

  /* MAX HEAPS 
  fs.createReadStream("./data-sources/person.csv")
    .pipe(parse())
    .on("data", (row) => {
      let limit = 7000;
      let offset = 0;
      let remaining = row.length;
      let arr = 0;

      for (let i = offset; i < limit; i++) {
        arrays[arr].push(JSON.stringify(row, null, 2).split(";"));
        remaining = remaining - limit;
        offset = limit;
        limit = limit + limit;
        i = i++;
      }
      resolve("Data fetched!");
    }); */
});

const Cleaning = () => {
  rawData.forEach((d) => {
    if (d !== void 0) {
      d = d.replace(/[\[\]']+/g, "");
      data.push(d.replace(/[^a-zA-zÄÖÜäöüß0-9 ]/g, "").trim());
    }
  });
  let labelNames = data.slice(0, 5);
  let values = data.slice(5, rawData.length);

  return { labels: labelNames, values: values };
};

const transferData = ({ labels, values }) => {
  let labelIndex = 0;
  let obj = {};
  for (let i = 0; i < values.length; i++) {
    obj[labels[labelIndex]] = values[i];
    if (labelIndex < 4) {
      labelIndex++;
    } else {
      labelIndex = 0;
      dataToJSON.push(obj);
      obj = {};
    }
  }
  fs.writeFileSync("./data/person.json", JSON.stringify(dataToJSON, null, 2));
};

readData.then(() => {
  transferData(Cleaning());
});

/*

/*
 * TODO
 *
 * Import the data from ./data-sources/person.csv to ./data/person.json
 * It's up to you to choose how you would like to do that.
 */
