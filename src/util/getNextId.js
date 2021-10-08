

export const getNextId = (list) => {
    const max = Math.max([...list.map(it => it.id)]);
    return max ? (max +1) : 1;
}