import { createStudents } from "./studentsCreation.js";


export function isClassroomVentilated(){
    return (Date.now() % 2 == 0) // 50 - 50 percentage chance
}

export function createClassroom(infected = 1) {
    let students = createStudents();
    let totalInfected = 0;
    if(infected > students.length * students[0].length)
        throw RangeError("Number of infected should not be higher than " + (students.length * students[0].length))
    
    for(let i = 0; i < students.length; i++){
        for(let j = 0; j < students[0].length; j++){
            students[i][j].currState = 'I';
            totalInfected++;
            if(totalInfected >= infected)
                break;
        }
        if (totalInfected >= infected)
            break;
    }
    console.log(totalInfected)
    return students;
}

console.log(createClassroom(1));