import { Cell, FlattenCell, FlattenRow, Row } from "./models";

function isFlattenCell(cell: Cell): cell is FlattenCell {
  return !Array.isArray(cell.value);
}

export function flattenCells(cells: Cell[]): FlattenCell[] {
  const flatCells: FlattenCell[] = [];

  for (const cell of cells) {
    if (isFlattenCell(cell)) {
      flatCells.push(cell);
    } else {
      flatCells.push(...flattenCells(cell.value as Cell[]));
    }
  }

  return flatCells;
}

export function flattenRows(rows: Row[]): FlattenRow[] {
  const flattenRows = rows.map((row) => {
    const cells = flattenCells(row.cells);
    return { ...row, cells };
  });

  return flattenRows;
}

type RowIndexedValue = { value: unknown; rowIndex: number };
type CellIndexToRowValues = Record<number, RowIndexedValue[]>;

export function getCellIndexToValues(rows: Row[]): CellIndexToRowValues {
  const cellIndexToValues = rows.reduce((acc, { cells }, rowIndex) => {
    cells.forEach(({ value }, cellIndex) => {
      if (!acc[cellIndex]) {
        acc[cellIndex] = [];
      }
      acc[cellIndex].push({ value, rowIndex });
    });
    return acc;
  }, {} as CellIndexToRowValues);

  return cellIndexToValues;
}

export function getCellIndexToMedian(
  rows: Row[]
): Record<number, RowIndexedValue> {
  const cellIndexToValues = getCellIndexToValues(rows);

  const cellIndexToMedianRowIndex = Object.entries(cellIndexToValues).reduce(
    (acc, [index, values]) => {
      if (values.some(({ value }) => typeof value !== "number")) {
        return acc;
      }
      const sortedValues = values.sort(
        ({ value: a }, { value: b }) => (a as number) - (b as number)
      );
      const medianIndex = Math.floor(sortedValues.length / 2);
      const median = sortedValues[medianIndex];
      return { ...acc, [index]: median };
    },
    {} as Record<number, RowIndexedValue>
  );

  return cellIndexToMedianRowIndex;
}

export function getCellIndexToSum(rows: Row[]): Record<number, number> {
  const cellIndexToSum = rows.reduce((acc, { cells }) => {
    cells.forEach(({ value }, cellIndex) => {
      if (typeof value === "number") {
        if (!acc[cellIndex]) {
          acc[cellIndex] = 0;
        }
        acc[cellIndex] += value;
      }
    });
    return acc;
  }, {} as Record<number, number>);

  return cellIndexToSum;
}

export function getCellIndexToAverage(rows: Row[]): Record<number, number> {
  const cellIndexToSum = getCellIndexToSum(rows);

  const cellIndexToAverage = Object.entries(cellIndexToSum).reduce(
    (acc, [index, sum]) => ({ ...acc, [index]: sum / rows.length }),
    {} as Record<number, number>
  );

  return cellIndexToAverage;
}

export function getCellIndexToDeviation(rows: Row[]): Record<number, number> {
  const cellIndexToAverage = getCellIndexToAverage(rows);
  const cellIndexToDeviationSum = rows.reduce((acc, { cells }) => {
    cells.forEach(({ value }, cellIndex) => {
      if (typeof value === "number") {
        if (!acc[cellIndex]) {
          acc[cellIndex] = 0;
        }
        acc[cellIndex] += Math.abs(value - cellIndexToAverage[cellIndex]);
      }
    });
    return acc;
  }, {} as Record<number, number>);

  const cellIndexToDeviation = Object.entries(cellIndexToDeviationSum).reduce(
    (acc, [index, sum]) => ({ ...acc, [index]: sum / rows.length }),
    {} as Record<number, number>
  );

  return cellIndexToDeviation;
}
