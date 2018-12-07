exports.print = printProgress;

function printProgress(arr) {
    let maxWidth = [6];

    arr.slice(1).forEach(function(row) {
      maxWidth.push(row[0].length);
    });

    let output = [];

    arr.forEach(function(row, rowIndex) {
      row.forEach(function(col, colIndex) {
        if (!output[colIndex]) output[colIndex] = [];
        output[colIndex].push(pad(col, maxWidth[rowIndex]));
      });
    });

    let outputString = output.map(r => r.join("|")).join("\n");
    return "```" + outputString + "```";
}

function pad(str, len) {
  return str.padStart((str.length + len) /2, ' ').padEnd(len, ' ');
}
