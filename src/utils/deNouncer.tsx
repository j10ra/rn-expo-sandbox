let timeoutId: any;

/**
 * Do something after delay
 * @param funcAfter
 * @param delay
 */
export const deNouncer = (funcAfter: any, delay = 500) => {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    funcAfter();
  }, delay);
};
