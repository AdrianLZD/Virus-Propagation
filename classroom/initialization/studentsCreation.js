import * as Assets from './studentsAssets.js';
import * as Utils from '../utils.js'
import { Student } from '../student.js'


let studentsMatrix = [
    [null, null, null, null], 
    [null, null, null, null], 
    [null, null, null, null], 
    [null, null, null, null]
];

function createStudent() {
    const firstName = Assets.FIRST_NAMES[Utils.randomRange(0, Assets.FIRST_NAMES.length - 1)];
    const middleName = Assets.MIDDLE_NAMES[Utils.randomRange(0, Assets.MIDDLE_NAMES.length - 1)];
    let student = new Student(firstName + ' ' + middleName);
    return student;
}

for(let i = 0; i < studentsMatrix.length; i++){
    for (let j = 0; j < studentsMatrix[0].length; j++) {
        studentsMatrix[i][j] = createStudent()
    }
}

console.log(studentsMatrix)

