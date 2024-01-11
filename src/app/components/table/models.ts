export interface Cell {
  label: string;
  value: unknown | Cell[];
}

export interface Row {
  id: string;
  cells: Cell[];
}
