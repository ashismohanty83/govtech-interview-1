const fs = require('fs');
const readline = require('readline');
const resolve = require('path').resolve;

/**
 * This function opens the file and scans for "TODO" string
 *
 * @param {string}  filename The filename to scan
 * @return {type} Returns the absolute path of the file
 */
const processFile = async filename => {
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream
  });

  const absolutePath = await fileScan(rl, filename);

  return absolutePath;
};

/**
 * This function reads line of string and search for "TODO"
 *
 * @param {string}  filename The filename to scan
 * @param {string}  rl Read line stream
 * @return {type}  Returns the absolute path of the file
 */
const fileScan = async (rl, filename) => {
  let path = null;
  for await (const line of rl) {
    let strLine = line.toUpperCase();
    /**
     * Below code will break the loop when we locate
     * the first occurence of "TODO", thus saves running time reading entire file.
     */
    if (strLine.includes('TODO')) {
      path = resolve(filename); // will get the absolute path of the file
      break;
    }
  }
  return path;
};

module.exports = processFile;
