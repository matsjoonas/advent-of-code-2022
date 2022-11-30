// @ts-nocheck
import fs from "fs";

function dayTest(solver, dataSets) {
  describe.each(dataSets)(`${solver.constructor.name} should return:`, (dataSet) => {
    it(`${dataSet.expectedResult} - for input path: ${dataSet.inputPath}`, () => {
      const data = fs.readFileSync(dataSet.inputPath);
      const result = solver.solve(data.toString());

      expect(result).toBe(dataSet.expectedResult);
    });
  });
}

export default dayTest;
