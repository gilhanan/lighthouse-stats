import { Cell, Row } from "./models";
import { flattenRows } from "./utils";

type RowIndexedValue = { value: Cell["value"]; rowIndex: number };
type CellIndexToSortedValues = {
  [cellIndex: string]: RowIndexedValue[];
};

function getCellIndexToSortedValues(rows: Row[]): CellIndexToSortedValues {
  const cellIndexToSortedValues: CellIndexToSortedValues = {};

  rows.forEach(({ cells }, rowIndex) => {
    cells.forEach(({ value }, cellIndex) => {
      if (typeof value !== "number") return;

      if (!cellIndexToSortedValues[cellIndex]) {
        cellIndexToSortedValues[cellIndex] = [];
      }

      cellIndexToSortedValues[cellIndex].push({ value, rowIndex });
    });
  });

  Object.keys(cellIndexToSortedValues).forEach((key) => {
    cellIndexToSortedValues[key].sort(({ value: a }, { value: b }) => {
      if (typeof a === "string" && typeof b === "string") {
        return a.localeCompare(b);
      }
      if (typeof a === "number" && typeof b === "number") {
        return a - b;
      }
      return -1;
    });
  });

  return cellIndexToSortedValues;
}

function getCellIndexToMediansRowIndex(rows: Row[]): {
  [index: string]: number;
} {
  const cellIndexToSortedValues = getCellIndexToSortedValues(rows);

  return Object.keys(cellIndexToSortedValues).reduce((acc, cellIndex) => {
    const values = cellIndexToSortedValues[cellIndex];
    const medianIndex = Math.floor(values.length / 2);
    const medianRowIndex = values[medianIndex].rowIndex;
    return { ...acc, [cellIndex]: medianRowIndex };
  }, {});
}

export function TableBody({ rows }: { rows: Row[] }) {
  const flattenedRows = flattenRows(rows);
  const cellIndexToMediansRowIndex =
    getCellIndexToMediansRowIndex(flattenedRows);

  return (
    <tbody>
      {flattenedRows.map(({ cells }, rowIndex) => {
        return (
          <tr key={rowIndex}>
            <td></td>
            {cells.map(({ value }, cellIndex) => {
              const isMedian =
                cellIndexToMediansRowIndex[cellIndex] === rowIndex;
              const className = `p-2 ${isMedian ? "bg-green-100" : ""}`;

              return (
                <td key={`${rowIndex}-${cellIndex}`} className={className}>
                  {value?.toString()}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
