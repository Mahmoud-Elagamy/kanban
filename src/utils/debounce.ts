export function debounce<T extends (...args: Parameters<T>) => unknown>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
