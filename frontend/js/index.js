function createClassroomMatrix(tableID, nrows, ncols) {
    // Get a reference to the table
    let tableRef = document.getElementById(tableID);

    for (let row = 0; row < nrows; row++) {
        let newRow = tableRef.insertRow();
        newRow.className = 'classroom-row';

        for (let col = 0; col < ncols; col++) {
            let studentCell = newRow.insertCell(col);
            studentCell.className = 'classroom-cell';

            studentCell.value = row + '|' + col;
            // Append a text node to the cell
            let newText = document.createTextNode(row + "," + col);
            studentCell.appendChild(newText);
            studentCell.onclick = function () {
                alert("Cell clicked: " + this.value);
            }
        }
    }
  }
  

function main() {
    const TABLE_ID = 'classroom-table';
    const DEFAULT_ROWS = 5;
    const DEFAULT_COLS = 5;

    createClassroomMatrix(TABLE_ID, DEFAULT_ROWS, DEFAULT_COLS);
}

main();
