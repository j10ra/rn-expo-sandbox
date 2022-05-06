let lastExecuted = 0;

export const deBouncer = (func: any, delay = 800) => {
  if (Date.now() > lastExecuted + delay) {
    lastExecuted = Date.now();
    // @ts-ignore: for arguments not being recognize by ts
    func.apply(this, arguments);
  }
};
