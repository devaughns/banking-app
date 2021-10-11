

export const getNextId = (list) => {
    const max = Math.max(...list.map(it => it.id));
    return max > 0 ? (max +1) : 1;
}