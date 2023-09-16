import fs from "fs";
import { parse } from "csv-parse";

let columnNames = [];
let tableData = [];
let dataToJSON = [];
let cleanData = [];
let d = [];

const Cleaning = (rawData, a) => {
  let cleanedData;
  let replaceValue;
  if (a == "label") {
    replaceValue = /[^a-zA-Z0-9 ]/g;
  }
  if (a == "tableD") {
    replaceValue = /[^a-zA-zÄÖÜäöüß0-9 ]/g;
  }
  rawData.forEach((d) => {
    cleanedData = d.replace(replaceValue, "");
    if (a == "label") {
      columnNames.push(cleanedData.trim());
    } /*
    if (a == "tableD") {
      // cleanData.push(cleanedData).trim();
    } */
  });
};

const readLabels = new Promise((resolve, reject) => {
  fs.createReadStream("./data-sources/person-small.csv")
    .pipe(parse({ to: 1 }))
    .on("data", (row) => {
      resolve(JSON.stringify(row, null, 2).split(";"));
    });
});

const readData = new Promise((resolve, reject) => {
  fs.createReadStream("./data-sources/person-small.csv")
    .pipe(parse())
    .on(
      "data",
      (row) =>
        d.push(...JSON.stringify(row, null, 2).split(";")) + resolve("resolved")
    );
});

const transferData = (columns, data) => {
  readData.then(() => {
    // Cleaning(d, "tableD");
    // let columnP = 0;
    //let dataObj = {};
    let obj = {};
    for (let i = 0; i < d.length - 1; i++) {
      //tableData = d[i].replace(/[^a-zA-Z0-9 ]/g, "").trim();
      tableData = d[i].replace(/[^a-zA-zÄÖÜäöüß0-9 ]/g, "").trim();
      console.log(tableData);
      for (let j = 1; j < tableData.length; j++) {
        obj[columns[i]] = tableData;
      }
      data.push(obj);
    }
    //console.log(data);

    //fs.writeFileSync("./data/person.json", JSON.stringify(data, null, 2));

    /* for (let i = 0; i < rawData.length + 1; i++) {
      if (columnP === 5) {
        columnP = 0;
        dataObj[columns[columnP]] = rawData[i];
        dataObj = {};
      } else {
        //console.log(rawData[i]);
        dataObj[columns[columnP]] = rawData[i];
        columnP = columnP + 1;

        /*dataObj = Object.assign(
              ...tableData.map((value) => {
                ({ [columnNames[columnP]]: value });
              })
            ); 
      } 
    }*/
  });
};

readLabels.then(async (data) => {
  await Cleaning(data, "label");
  transferData(columnNames, dataToJSON);
});

/*

/*
 * TODO
 *
 * Import the data from ./data-sources/person.csv to ./data/person.json
 * It's up to you to choose how you would like to do that.
 */
