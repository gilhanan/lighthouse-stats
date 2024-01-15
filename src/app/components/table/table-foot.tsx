import { Cell, Row } from "./models";
import { flattenRows } from "./utils";

function getCellIndexToMedian(rows: Row[]): Record<number, number> {
  const cellIndexToValues = rows.reduce((acc, { cells }) => {
    cells.forEach(({ value }, cellIndex) => {
      if (typeof value === "number") {
        if (!acc[cellIndex]) {
          acc[cellIndex] = [];
        }
        acc[cellIndex].push(value);
      }
    });
    return acc;
  }, {} as Record<number, number[]>);

  const cellIndexToMedian = Object.entries(cellIndexToValues).reduce(
    (acc, [index, values]) => {
      const sortedValues = values.sort((a, b) => a - b);
      const medianIndex = Math.floor(sortedValues.length / 2);
      const median = sortedValues[medianIndex];
      return { ...acc, [index]: median };
    },
    {} as Record<number, number>
  );

  return cellIndexToMedian;
}

function getCellIndexToSum(rows: Row[]): Record<number, number> {
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

function getCellIndexToAverage(rows: Row[]): Record<number, number> {
  const cellIndexToSum = getCellIndexToSum(rows);

  const cellIndexToAverage = Object.entries(cellIndexToSum).reduce(
    (acc, [index, sum]) => ({ ...acc, [index]: sum / rows.length }),
    {} as Record<number, number>
  );

  return cellIndexToAverage;
}

function getCellIndexToDeviation(rows: Row[]): Record<number, number> {
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

function FooterRow({
  header,
  cells,
  cellIndexToValue,
}: {
  header: string;
  cells: Cell[];
  cellIndexToValue: Record<number, number>;
}) {
  return (
    <tr>
      <th className="text-start border p-2 bg-gray-50">{header}</th>
      {cells.map((_, cellIndex) => {
        const value = cellIndexToValue[cellIndex];

        return (
          <td key={cellIndex} className="p-2">
            {typeof value === "number" ? value.toFixed(2) : ""}
          </td>
        );
      })}
    </tr>
  );
}

export function TableFoot({ rows }: { rows: Row[] }) {
  const flattenedRows = flattenRows(rows);
  const cells = flattenedRows[0]?.cells || [];
  const cellIndexToMedian = getCellIndexToMedian(flattenedRows);
  const cellIndexToAverage = getCellIndexToAverage(flattenedRows);
  const cellIndexToDeviation = getCellIndexToDeviation(flattenedRows);

  return (
    <tfoot className="border">
      <FooterRow
        header="Median"
        cells={cells}
        cellIndexToValue={cellIndexToMedian}
      />
      <FooterRow
        header="Average"
        cells={cells}
        cellIndexToValue={cellIndexToAverage}
      />
      <FooterRow
        header="Deviation"
        cells={cells}
        cellIndexToValue={cellIndexToDeviation}
      />
    </tfoot>
  );
}
