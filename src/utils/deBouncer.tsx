let lastExecuted = 0;

export const deBouncer = (func: any, delay = 800) => {
  if (Date.now() > lastExecuted + delay) {
    lastExecuted = Date.now();
    func.apply(this, arguments);
  }
};
