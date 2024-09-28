import { FormatMobPipe } from "./format-mob.pipe";

describe('FormatMobPipe', () => {
    it('Should format number to India by default', () => {
        const pipe = new FormatMobPipe();
        expect(pipe.transform(1234567890)).toBe("+91-1234567890");
    });

    it('Should format number to USA', () => {
        const pipe = new FormatMobPipe();
        expect(pipe.transform(1234567890,"USA")).toBe("+1-1234567890");
    });
});