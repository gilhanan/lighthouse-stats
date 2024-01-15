import { ReactNode } from "react";

export interface Cell {
  label: string;
  value: ReactNode | Cell[];
}

export interface FlattenCell extends Cell {
  value: ReactNode;
}

export interface Row {
  id: string;
  children: ReactNode;
  className?: string;
  cells: Cell[];
}

export interface FlattenRow extends Row {
  cells: FlattenCell[];
}
