export const convertDateToTimestamp = (date: Date): number =>
  Math.floor(date.getTime() / 1000);

export const getCurentTimestamp = () => Math.floor(Date.now() / 1000);

/**
 *  Sleep process
 *
 * @param ms miliseconds
 * @returns
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
