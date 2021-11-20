export function Vaccine(type = 'noVaccine', dosis = 0) {
    this.type = type;
    this.dosis = dosis;
}

export const DEFAULT_TRANSITION_MATRIX = [
    [0.0000, 0.0000, 0.0000, 0.0000, 0.0000],
    [0.0000, 0.8214, 0.0278, 0.1508, 0.0000],
    [0.1000, 0.0000, 0.9000, 0.0000, 0.0000],
    [0.0000, 0.0000, 0.0000, 0.0000, 1.0000],
    [0.0714, 0.0000, 0.0000, 0.0000, 0.9286]]

export function Student(name = '', prevState = 'S', currState = 'S', vaccine = new Vaccine(), faceMask = 'noMask', transitionMatrix = DEFAULT_TRANSITION_MATRIX) {
    this.name = name;
    this.prevState = prevState;
    this.currState = currState;
    this.vaccine = vaccine;
    this.faceMask = faceMask;
    this.transitionMatrix = transitionMatrix;
}



