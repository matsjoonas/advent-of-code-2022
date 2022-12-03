export default function priority(char: string) {
  const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return priorities.indexOf(char) + 1;
}
