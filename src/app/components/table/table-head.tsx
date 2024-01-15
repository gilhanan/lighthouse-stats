import React from "react";
import { Cell } from "./models";

function calculateDepth(cells: Cell[]): number {
  return (
    1 +
    Math.max(
      0,
      ...cells.map(({ value }) =>
        Array.isArray(value) ? calculateDepth(value) : 0
      )
    )
  );
}

function getCellsAtDepth({
  cells,
  depth,
  currentDepth = 1,
}: {
  cells: Cell[];
  depth: number;
  currentDepth?: number;
}): Cell[] {
  const result: Cell[] = [];

  if (depth < 1) {
    return result;
  }

  cells.forEach((cell) => {
    if (currentDepth === depth) {
      result.push(cell);
    } else if (Array.isArray(cell.value)) {
      result.push(
        ...getCellsAtDepth({
          cells: cell.value as Cell[],
          depth,
          currentDepth: currentDepth + 1,
        })
      );
    }
  });

  return result;
}

function getColSpan({ value }: Cell): number {
  if (!Array.isArray(value)) {
    return 1;
  }

  return (value as Cell[]).reduce(
    (sum, childCell) => sum + getColSpan(childCell),
    0
  );
}

export function TableHead({ cells }: { cells: Cell[] }) {
  const maxDepth = calculateDepth(cells);

  const rows = new Array(maxDepth).fill(null).map((_, rowIndex) => {
    const currentCells = getCellsAtDepth({ cells, depth: rowIndex + 1 });

    return (
      <tr key={rowIndex}>
        <th></th>
        {currentCells.map((cell, cellIndex) => {
          const { label, value } = cell;
          const rowSpan = Array.isArray(value) ? 1 : maxDepth - rowIndex;
          const colSpan = getColSpan(cell);

          return (
            <th
              key={cellIndex}
              rowSpan={rowSpan}
              colSpan={colSpan}
              className="text-center border p-2 bg-gray-50"
            >
              {label}
            </th>
          );
        })}
      </tr>
    );
  });

  return <thead>{rows}</thead>;
}
