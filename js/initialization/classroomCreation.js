// import _ from "../libs/lodash.js";
import { createStudents } from "./studentsCreation.js";
import { applyTransitions, calculateMatrix } from "../markov-logic/markov.js";

export function isClassroomVentilated() {
    return (Date.now() % 2 == 0) // 50 - 50 percentage chance
}

export function createClassroom(infected = 1, rows=4, cols=4) {
    let students = createStudents(rows, cols);
    console.log("infected ", infected, students.length * students[0].length);
    let totalInfected = 0;
    // if (infected > students.length * students[0].length)
    //     throw RangeError("Number of infected should not be higher than " + (students.length * students[0].length))


    // console.log("infected num", infected);
    // var arr = [];
    // while(arr.length < infected){
    //     var r = Math.floor(Math.random() * 100) + 1;
    //     if(arr.indexOf(r) === -1) arr.push(r);
    // }

    // console.log("hola", arr);

    // for (let k=0; k<infected; k++) {
    //     let i = arr[k] / students.length;
    //     let j = arr[k] % students[0].length;
    //     students[i][j].currState = 'I';
    //     students[i][j].transitionMatrix[0][0] = 0.0000;
    //     students[i][j].transitionMatrix[0][1] = 1.0000;
    //     totalInfected++;
    // }


    for (let i = 0; i < students.length; i++) {
        for (let j = 0; j < students[0].length; j++) {
            students[i][j].currState = 'I';
            students[i][j].transitionMatrix[0][0] = 0.0000;
            students[i][j].transitionMatrix[0][1] = 1.0000;
            totalInfected++;
            if (totalInfected >= infected)
                break;
        }
        if (totalInfected >= infected)
            break;
    }
    
    console.log(totalInfected)
    return students;
}

export function getNewDay(currentDay, isVentilated) {
    let dayWithTransitions = calculateMatrix(currentDay, isVentilated);
    let dayWithNewStates = applyTransitions(dayWithTransitions);
    let newDay = _.cloneDeep(dayWithNewStates);
    return newDay;
}

// // Tests
// let isVentilated = isClassroomVentilated();
// let original = createClassroom(1);
// let newDay = _.cloneDeep(original)
// for (let i = 0; i < 50; i++) {
//     console.log(`Day ${i + 1}:`);
//     let dayWithTransitions = calculateMatrix(newDay, isVentilated);
//     let dayWithNewStates = applyTransitions(dayWithTransitions);
//     newDay = _.shuffle(_.cloneDeep(dayWithNewStates));
//     console.log(`\n`);
// }