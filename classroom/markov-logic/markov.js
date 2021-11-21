import _ from 'lodash';

const RISK_MULTIPLIERS = {
    vaccine: {
        'noVaccine': {
            0: 1
        },
        'Pfizer': {
            1: 0.76,
            2: 0.17
        },
        'Moderna': {
            1: 0.76,
            2: 0.17
        },
        'Astra Zeneca': {
            1: 0.76,
            2: 0.47
        },
        'Johnson & Johnson': {
            1: 0.36,
        },
        'Sputnik V': {
            1: 0.76,
            2: 0.17
        },
        'Cansino/Sinovac': {
            1: 0.76,
            2: 0.47
        }
    },
    faceMask: {
        'noMask': 1,
        'clothThin': 1,
        'clothThick': (2 / 3),
        'surgical': (1 / 2),
        'filter': (1 / 2),
        'N95': (1 / 3)
    },
    ventilation: {
        'none': 1,
        'oneOutlet': (1 / 4)
    }
}

const STATE_INDEXES = {
    S: 0,
    I: 1,
    EA: 2,
    ES: 3,
}

const INDEXED_STATES = ['S', 'I', 'EA', 'ES'];

/**
 * @param {Student[][]} classroom
 * @returns {Student[][]}
 */
export function calculateMatrix(classroom) {
    return classroom.map((classroomRow, i) => {
        return classroomRow.map((student, j) => {
            if (student.currState == 'S') {
                let updatedMatrix = calculateMatrixProb(i, j, classroom)
                return { ...student, transitionMatrix: updatedMatrix };
            }
            return student;
        });
    });
}

/**
 * 
 * @param {Number} i 
 * @param {Number} j 
 * @param {Student[][]} classroom 
 * @returns 
 */
function calculateMatrixProb(i, j, classroom) {
    const [m, n] = [classroom.length, classroom[0].length];
    const neighborPositions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    let infectedProb = neighborPositions.reduce((prob, nPos) => {
        const [ni, nj] = [i + nPos[0], j + nPos[1]];
        if (validIndex(ni, nj, m, n)) {
            if (['I', 'EA'].includes(classroom[ni][nj].currState)) {
                prob += 0.14 * RISK_MULTIPLIERS.faceMask[classroom[ni][nj].faceMask];
            }
        }
        return prob;
    }, 0);
    infectedProb = _.round(
        infectedProb * (
            RISK_MULTIPLIERS.faceMask[classroom[i][j].faceMask]
            * RISK_MULTIPLIERS.vaccine[classroom[i][j].vaccine.type][classroom[i][j].vaccine.dosis]
            * RISK_MULTIPLIERS.ventilation['none']
        ),
        2
    );
    // if (infectedProb != 0) console.log('Likely to be infected: ', infectedProb);

    let updatedTransitionMatrix = _.cloneDeep(classroom[i][j].transitionMatrix);
    updatedTransitionMatrix[0][1] = infectedProb;
    updatedTransitionMatrix[0][0] = _.round(1 - infectedProb, 2);

    return updatedTransitionMatrix;
}

function validIndex(i, j, m, n) {
    return i >= 0 && i < m && j >= 0 && j < n;
}

/**
 * @param {Student[][]} classroom
 * @returns {Student[][]}
 */
export function applyTransitions(classroom) {
    return classroom.map((classroomRow) => {
        return classroomRow.map((student) => {
            let newState = getNewState(student);
            return { ...student, prevState: student.currState, currState: newState };
        });
    });
}

/**
 * 
 * @param {Student} student 
 */
function getNewState(student) {
    let currIndex = STATE_INDEXES[student.currState];
    let rand = Math.random();
    let newState = '-';
    for (let [idx, stateProb] of student.transitionMatrix[currIndex].entries()) {
        rand -= stateProb;
        if (rand < 0) {
            newState = INDEXED_STATES[idx];
            if (newState != student.currState) console.log(`${student.name} changed state from ${student.currState} to ${newState}.`);
            break;
        }
    }
    return newState;
}