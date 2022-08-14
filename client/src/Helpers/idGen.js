
export const idGen = (min) => {

    min = Math.random() * (min * (17 * (Math.random() - 0.29)) - (Math.random()));
    min = String(min).slice(6, 9)
    return parseInt(min)
}