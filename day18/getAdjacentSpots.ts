export default function getAdjacentSpots(point: number[]) {
  const spots = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  return spots.map(spot => {
    return [point[0] + spot[0], point[1] + spot[1], point[2] + spot[2]];
  });
};
