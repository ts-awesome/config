const {Config} = require('../src/index');
const {Computer} = require('./models');

describe('testing has/get methods', () => {
    const config = new Config();
    const path = 'testPassed';
    const fakePath = 'should be false';
    const model = new Computer();
    it('testing has method', () => {
       const shouldBeTrue = config.has(path);
       const shouldBeFalse = config.has(fakePath);
       expect(shouldBeTrue).toBe(true);
       expect(shouldBeFalse).toBe(false);
   });

    it('testing get method(path case)', () => {
        const shouldBeTrue = config.get(path);
        expect(shouldBeTrue).toBe('Test Passed');
    });

    it('testing get method(Model and path case)', () => {
       const result = config.get(path, () => {
           return new Computer;
       });
       expect(result).toStrictEqual(model);
    });

    it('testing get method(path and typeof String case)', () => {
       const result = config.get(path, () => {
           return String('Test Passed')
       });
       expect(result).toBe('Test Passed');
    });

    it('testing get method(path and typeof Number case)', () => {
        const result = config.get(path, () => {
            return Number(1)
        });
        expect(result).toBe(1);
    });

    it('testing get method(path and typeof Boolean case)', () => {
       const result = config.get(path, () => {
           return true;
       });
       expect(result).toBe(true);
    });

    it('testing get method(path and [typeof String] case)', () => {
        const result = config.get(path, () => {
            return ['Test Passed', 'Testing']
        });
        expect(result[0]).toBe('Test Passed');
    });

    it('testing get method(path and [typeof Number] case)', () => {
        const result = config.get(path, () => {
            return [1, 2, 3];
        });
        expect(result).toStrictEqual([1, 2, 3]);
    });

    it('testing get method(path and [typeof Boolean] case)', () => {
        const result = config.get(path, () => {
            return [true, false, true];
        });
        expect(result).toStrictEqual([true, false, true]);
    });
});