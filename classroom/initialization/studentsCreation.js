import * as Utils from '../utils.js'
import { FIRST_NAMES, MIDDLE_NAMES } from './studentsAssets.js';
import { Student, Vaccine } from '../student.js'

const VACCINES_PROB = {
    'Pfizer': 0.2704,
    'Moderna': 0.0276,
    'Astra Zeneca': 0.3906,
    'Johnson & Johnson': 0.0107,
    'Sputnik V': 0.0710,
    'Cansino/Sinovac': 0.2297
}

const ONE_DOSIS_VACS = new Set(['Johnson & Johnson', 'Cansino/Sinovac']);

const DOSIS_PROB = {
    0 : 0.4208,
    1 : 0.0928,
    2 : 0.4864 
}

const MASK_PROB = {
    'noMask' : 0.1500,
    'clothThin' : 0.1252,
    'clothThick' : 0.2879,
    'surgical' : 0.2758,
    'filter' : 0.0765,
    'N95' : 0.0846
}
// Probabilities over a 100%
// cloththick 0.3388
// cloththin 0.1474
// surgical 0.3244
// filter 0.0899
// n95 0.0995

function defineVaccine(){
    let vaccine = new Vaccine();

    const ran1 = Math.random();
    let dosisAmount = 0;
    let counter1 = DOSIS_PROB[dosisAmount];
    while (counter1 < ran1) {
        dosisAmount++;
        counter1 += DOSIS_PROB[dosisAmount];
    }

    vaccine.dosis = dosisAmount;

    if (vaccine.dosis != 0) {
        const ran2 = Math.random();
        const vaccinesTypes = Object.keys(VACCINES_PROB);

        let index = 0;
        let vaccineType = vaccinesTypes[index];
        let counter2 = VACCINES_PROB[vaccineType];
        while (counter2 < ran2) {
            index++;
            vaccineType = vaccinesTypes[index];
            counter2 += VACCINES_PROB[vaccineType];
        }
        vaccine.type = vaccineType;

        if (ONE_DOSIS_VACS.has(vaccine.type)){
            vaccine.dosis = 1;
        }
    }

    return vaccine;
}

function defineMask(){
    const ran = Math.random();
    const MASK_TYPES = Object.keys(MASK_PROB);

    let index = 0;
    let maskType = MASK_TYPES[index];
    let counter = MASK_PROB[maskType];
    while (counter < ran) {
        index++;
        maskType = MASK_TYPES[index];
        counter += MASK_PROB[maskType];
    }
    
    return maskType;
}

function createStudent() {
    const firstName = FIRST_NAMES[Utils.randomRange(0, FIRST_NAMES.length - 1)];
    const middleName = MIDDLE_NAMES[Utils.randomRange(0, MIDDLE_NAMES.length - 1)];
    let vaccine = defineVaccine();
    let mask = defineMask();
    let student = new Student(firstName + ' ' + middleName);
    student.vaccine = vaccine;
    student.faceMask = mask;
    return student;
}

export function createStudents() {
    let studentsMatrix = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
    ];

    for (let i = 0; i < studentsMatrix.length; i++) {
        for (let j = 0; j < studentsMatrix[0].length; j++) {
            studentsMatrix[i][j] = createStudent()
        }
    }

    return studentsMatrix;
}

createStudents()

