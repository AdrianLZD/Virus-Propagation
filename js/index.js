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

	var modal = document.getElementById("tvesModal");
	var body = document.getElementsByTagName("body")[0];

	for (let row = 0; row < nrows; row++) {
		let newRow = tableRef.insertRow();
		newRow.className = "classroom-row";

		for (let col = 0; col < ncols; col++) {
			let studentCell = newRow.insertCell(col);
			let student = classroom[row][col];

			studentCell.className = `classroom-cell ${student.currState}`;

			// Append a text node to the cell
			studentCell.text = document.createTextNode(student.name);
			studentCell.appendChild(studentCell.text);

			studentCell.onclick = function () {
				modal.style.display = "block";
				body.style.position = "static";
				body.style.height = "100%";
				body.style.overflow = "hidden";
                

				document.querySelector(
					"#m-student-name"
				).innerHTML = `${student.name}`;
				document.querySelector(
					"#m-student-info"
				).innerHTML = ` <span> <strong> Previous state: </strong> ${student.prevState} </span> 
                                <span> <strong> Current state: </strong> ${student.currState} </span> 
                                <span> <strong> Vaccine: </strong> ${student.vaccine.type} </span>
                                <span> <strong> Dosis: </strong> ${student.vaccine.dosis} </span>
                                <span> <strong> Face mask: </strong> ${student.faceMask} </span>
                                <span> <strong> Transition matrix: </strong> </span>
                                <table id="transition-matrix-table"> </table>
                            `;
                createTransitionMatrixTable(student.transitionMatrix);
			};

			studentCell.update = function (classroom) {                
				studentCell.value = classroom[row][col].name;
				let student = classroom[row][col];

				studentCell.className = `classroom-cell ${student.currState}`;
				studentCell.text.nodeValue = studentCell.value;

                studentCell.onclick = function () {
                    modal.style.display = "block";
                    body.style.position = "static";
                    body.style.height = "100%";
                    body.style.overflow = "hidden";
                    
    
                    document.querySelector(
                        "#m-student-name"
                    ).innerHTML = `${student.name}`;
                    document.querySelector(
                        "#m-student-info"
                    ).innerHTML = ` <span> <strong> Previous state: </strong> ${student.prevState} </span> 
                                    <span> <strong> Current state: </strong> ${student.currState} </span> 
                                    <span> <strong> Vaccine: </strong> ${student.vaccine.type} </span>
                                    <span> <strong> Dosis: </strong> ${student.vaccine.dosis} </span>
                                    <span> <strong> Face mask: </strong> ${student.faceMask} </span>
                                    <span> <strong> Transition matrix: </strong> </span>
                                    <table id="transition-matrix-table"> </table>
                                `;
                    createTransitionMatrixTable(student.transitionMatrix);
                };
                
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
			studentCell.update(classroom);
		}
	}
}

function createTransitionMatrixTable(transitionMatrix) {
    let tableRef = document.getElementById("transition-matrix-table");
    let nrows = transitionMatrix.length;
    let ncols = nrows > 0 ? transitionMatrix[0].length : 0;


	for (let row = 0; row < nrows; row++) {
		let newRow = tableRef.insertRow();
		newRow.className = "";
		for (let col = 0; col < ncols; col++) {
			let cell = newRow.insertCell(col);
            cell.text = document.createTextNode(transitionMatrix[row][col]);
			cell.appendChild(cell.text);
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

    var sliderRows = document.getElementById("slider-rows");
    var sliderCols = document.getElementById("slider-cols");
    var sliderInfected = document.getElementById("slider-infected");
    var sliderSpeed = document.getElementById("slider-speed");

    let currentDay = null;
    let isVentilated = false;


    let btnCreateClassroom = document.getElementById("btn-create-classroom");
    btnCreateClassroom.onclick = () => {
        const rows = sliderRows.value;
        const cols = sliderCols.value;
        const infected = sliderInfected.value;

        console.log("rows", rows, "cols", cols, "infected", infected);
        console.log("debuggg");

        if (infected > rows * cols) {
            alert("You can not have more infected students than students");
            return;
        }
        isVentilated = true;

        // let classroom = createClassroom(3);
        let classroom = createClassroom(infected, rows, cols);

        createClassroomTable(TABLE_ID, classroom);
    
        currentDay = _.cloneDeep(classroom);

        console.log(classroom);
    }

	let btnNextDay = document.getElementById("btn-next-day");
	btnNextDay.onclick = function () {
		update(currentDay, isVentilated, TABLE_ID);
	};

	let playing = false;
	let btnPlayPause = document.getElementById("btn-play-pause");
	var interval = null;



	btnPlayPause.onclick = function () {
        const playSpeed = 3000 / sliderSpeed.value;

		if (playing) {
			this.textContent = "Play";
			clearInterval(interval);
		} else {
			this.textContent = "Pause";
			interval = setInterval(
				() => update(currentDay, isVentilated, TABLE_ID),
				playSpeed
			);
		}

		playing = !playing;
		console.log("Play/Pause");
	};

	var modal = document.getElementById("tvesModal");
	var span = document.getElementsByClassName("close")[0];
	var body = document.getElementsByTagName("body")[0];

	span.onclick = function () {
		modal.style.display = "none";

		body.style.position = "inherit";
		body.style.height = "auto";
		body.style.overflow = "visible";
	};

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";

			body.style.position = "inherit";
			body.style.height = "auto";
			body.style.overflow = "visible";
		}
	};



    sliderRows.oninput = (event) => {
        // update number of rows
        sliderRows.parentNode.style.setProperty('--value',sliderRows.value); 
        sliderRows.parentNode.style.setProperty('--text-value', JSON.stringify(sliderRows.value));


    }

}

main();

