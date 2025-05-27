export function useDisableLastRow<T>(data: T[], cols: number): boolean[] {
  const length = data.length;
  const rows = Math.ceil(length / cols);
  const lastRowStartIndex = (rows - 1) * cols;

  return data.map((_, index) => index >= lastRowStartIndex);
}
