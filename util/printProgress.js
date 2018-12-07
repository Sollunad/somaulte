exports.print = printProgress;

function printProgress(arr) {
    let maxWidth = [6];

    arr.slice(1).forEach(function(row) {
      maxWidth.push(row[0].length);
    });

    let output = [];

    arr.forEach(function(row) {
      row.forEach(function(data, index) {
        if (!output.index) output[index] = [];
        output[index] = data.padStart(maxWidth[index], ' ');
      });
    });

    let outputString = output.map(r => r.join("|")).join("\n");
    return outputString;
    console.log(outputString);  
}

/*
 [Boss, VG, Gorse],
 [Daniel, X, X]

*/
