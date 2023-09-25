import fs from "fs";
import { parse } from "csv-parse";

let dataToJSON = [];
let data = [];
let arrays = [[], [], [], [], []];
let labelNames;
let length = 0;

const clean = (data, id) => {
  let values = [];
  for (let i = 0; i < data.length; i++) {
    let cleanedData = data[i].replace(/[\[\]']+/g, "");
    cleanedData = cleanedData.replace(/[^a-zA-zÄÖÜäöüß0-9 ]/g, "").trim();
    values.push(cleanedData);
  }
  arrays[id].push(values);
};

const readData = function () {
  return new Promise((resolve) => {
    fs.createReadStream("./data-sources/person.csv")
      .pipe(parse())
      .on("data", (row) => {
        let r = JSON.stringify(row, null, 2).split(";");
        length = length + 1;

        if (length <= 7000) clean(r, 0);
        if (length <= 14000 && length > 7000) clean(r, 1);
        if (length <= 21000 && length > 14000) clean(r, 2);
        if (length <= 28000 && length > 21000) clean(r, 3);
        if (length > 28000) clean(r, 4);

        labelNames = arrays[0][0].slice(0, 5);

        let obj = {};

        for (let i = 0; i < arrays.length; i++) {
          arrays[i].forEach((value) => {
            obj[labelNames[0]] = parseInt(value[0]);
            obj[labelNames[1]] = value[1];
            obj[labelNames[2]] = value[2];
            obj[labelNames[3]] = value[3];
            obj[labelNames[4]] = value[4];
          });
        }
        data.push(obj);
      });
    setTimeout(function () {
      resolve("Data fetched!");
    }, 25000);
  });
};

const transferData = function () {
  return new Promise((resolve) => {
    dataToJSON = data.slice(1, data.length);

    for (let i = 0; i < dataToJSON.length; i++) {
      fs.writeFileSync(
        "./data/person.json",
        JSON.stringify(dataToJSON[i], null, 2),
        {
          flag: "a+",
        }
      );
      if (i < dataToJSON.length - 1)
        fs.writeFileSync("./data/person.json", ",", {
          flag: "a+",
        });
    }
    setTimeout(function () {
      resolve("Data fetched!");
    }, 5000);
  });
};

const writeJSONfile = async () => {
  fs.writeFileSync("./data/person.json", "[");
  await readData();
  await transferData();
  fs.writeFileSync("./data/person.json", "]", {
    flag: "a+",
  });
  console.log("Data successfully imported!");
};

writeJSONfile();
/*


/*
 * TODO
 *
 * Import the data from ./data-sources/person.csv to ./data/person.json
 * It's up to you to choose how you would like to do that.
 */
