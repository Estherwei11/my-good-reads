// High order function
const debounce = (fn: any, interval: number) => {
  let actionTime: any;

  return (...args: any) => {
    clearTimeout(actionTime);
    actionTime = setTimeout(() => {fn(...args)}, interval);
  };
};

export default debounce;
