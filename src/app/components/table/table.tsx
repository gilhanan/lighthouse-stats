import { Cell, Row } from "./models";
import { TableBody } from "./table-body";
import { TableHead } from "./table-head";

interface Props {
  title: string;
  rows: Row[];
}

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

export function Table({ title, rows }: Props) {
  const cellIndexToMediansRowIndex = getCellIndexToMediansRowIndex(rows);

  return (
    <div className="inline-flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <table className="table-auto">
        <TableHead cells={rows[0].cells} />
        <TableBody rows={rows} />
      </table>
    </div>
  );
}
