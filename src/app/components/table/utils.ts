import { Cell, Row } from "./models";

export function flattenCells(cells: Cell[]): Cell[] {
  const flatCells: Cell[] = [];

  for (const cell of cells) {
    if (Array.isArray(cell.value)) {
      flatCells.push(...flattenCells(cell.value));
    } else {
      flatCells.push(cell);
    }
  }

  return flatCells;
}

export function flattenRows(rows: Row[]): Row[] {
  const flattenRows = rows.map((row) => {
    const cells = flattenCells(row.cells);
    return { ...row, cells };
  });

  return flattenRows;
}
