declare global {
  namespace jest {
    interface Matchers<R> {
      toBeDefined(): R;
      toBeNull(): R;
      toBe(expected: any): R;
      toEqual(expected: any): R;
      toBeGreaterThan(expected: number): R;
      toBeGreaterThanOrEqual(expected: number): R;
    }
  }
}

declare const describe: any;
declare const beforeEach: any;
declare const it: any;
declare const expect: any;
declare const jest: any;

export {};
