import intersectionOfArrays from "./intersectionOfArrays";

export default function intersectionOfStrings(a: string, b: string) {
  return intersectionOfArrays(a.split(''), b.split('')).join();
}
