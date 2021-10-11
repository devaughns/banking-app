import {getNextId} from "./getNextId";

describe("getNextId", () => {

    it ("should return the next id in the sequence", () => {
        const list = [{id:3}, {id:14}, {id: 99}, {id:98}];
        expect(getNextId(list)).toBe(100);
    });

    it ("should return 1 when the list is empty", () => {
        expect(getNextId([])).toBe(1);
    });

    it ("should return 1 when the objects in list do not have id field", () => {
        const list = [{number: 1}, {number: 44}, {number: 1098}];
        expect(getNextId(list)).toBe(1);
    })

});
