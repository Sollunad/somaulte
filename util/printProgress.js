exports.print = printProgress();

function printProgress(arr) {
    let maxWidth = [];

    arr.forEach(function(row) {
       for (let i = 0; i < row.length; i++) {
           if (!maxWidth[i]) maxWidth[i] = row[i].length;
           else if (row[i].length > maxWidth[i]) maxWidth[i] = row[i].length;
       }
    });


}