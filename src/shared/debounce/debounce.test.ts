import debounce  from "./debounce";

describe('debounce - high order function to limit function execution rate', () => {
  it('should successfully execute a function', (done) => {
    const debouncedFunction = debounce(done, 500);
    debouncedFunction();
  });
});
