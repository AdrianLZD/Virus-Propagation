// import _ from "./libs/lodash.js";
import { applyTransitions, calculateMatrix } from "./markov-logic/markov.js";
import {
	createClassroom,
	getNewDay,
} from "./initialization/classroomCreation.js";

function createClassroomTable(tableID, classroom) {
	// Get a reference to the table
	let tableRef = document.getElementById(tableID);
	let nrows = classroom.length;
	let ncols = nrows > 0 ? classroom[0].length : 0;

	for (let row = 0; row < nrows; row++) {
		let newRow = tableRef.insertRow();
		newRow.className = "classroom-row";

		for (let col = 0; col < ncols; col++) {
			let studentCell = newRow.insertCell(col);
            let student = classroom[row][col];

			studentCell.className = `classroom-cell ${student.currState}`;

			studentCell.value =
				classroom[row][col].currState +
				"    |   " +
				classroom[row][col].name;
			// Append a text node to the cell
			studentCell.text = document.createTextNode(studentCell.value);
			studentCell.appendChild(studentCell.text);
			studentCell.onclick = function () {
				alert("Cell clicked: " + studentCell.className);
			};
		}
	}
}


function updateClassroomTable(tableID, classroom) {
	// Get a reference to the table
	let tableRef = document.getElementById(tableID);
	let nrows = classroom.length;
	let ncols = nrows > 0 ? classroom[0].length : 0;

	for (let row = 0; row < nrows; row++) {
		for (let col = 0; col < ncols; col++) {
			let studentCell = tableRef.rows[row].cells[col];
            let student = classroom[row][col];

            studentCell.className = `classroom-cell ${student.currState}`;

			studentCell.value =
				classroom[row][col].currState +
				"    |   " +
				classroom[row][col].name;
			studentCell.text.nodeValue = studentCell.value;
		}
	}
}

function update(currentDay, isVentilated, TABLE_ID) {
    console.log("update");
	currentDay = getNewDay(currentDay, isVentilated);
	updateClassroomTable(TABLE_ID, currentDay);
}

function main() {
	const TABLE_ID = "classroom-table";
	const DEFAULT_ROWS = 5;
	const DEFAULT_COLS = 5;

	let isVentilated = true; // TODO REMOVE HARCODED isClassroomVentilated();

	let classroom = createClassroom(3);
	createClassroomTable(TABLE_ID, classroom);

	let currentDay = _.cloneDeep(classroom);

	let btnNextDay = document.getElementById("btn-next-day");
	btnNextDay.onclick = function () {
		update(currentDay, isVentilated, TABLE_ID);
	};

	let playing = false;
	let btnPlayPause = document.getElementById("btn-play-pause");
    var interval = null;

	btnPlayPause.onclick = function () {
		if (playing) {
			this.textContent = "Play";
            clearInterval(interval);
		} else {
			this.textContent = "Pause";
            interval = setInterval(
                () => update(currentDay, isVentilated, TABLE_ID),
                1000
            );
		}

		playing = !playing;
		console.log("Play/Pause");
	};
}

main();
