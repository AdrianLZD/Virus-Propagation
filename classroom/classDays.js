import { applyTransitions, calculateMatrix } from "../markov-logic/markov.js";
import _ from "lodash";
import createClassroom from "./classroomCreation.js";

let daysPassing = 0;
let firstDay = createClassroom(1);
let nextDay = _.cloneDeep(firstDay)
var interval = setInterval(actualization,3000);

function actualization(students){
    daysPassing++;
    console.log("Day "+ daysPassing);

    let dayWithTransitions = calculateMatrix(nextDay);
    let dayWithNewStates = applyTransitions(dayWithTransitions);
    nextDay = _.shuffle(_.cloneDeep(dayWithNewStates));


    if (daysPassing === 50) {
        clearInterval(interval);
    }

}

