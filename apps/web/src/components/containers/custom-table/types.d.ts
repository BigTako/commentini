export interface CustomTableColumn {
  id: string | number;
  name: string;
  field: string;
  width: number | string;
  textAlign?: "center" | "left" | "right" | "justify" | "inherit";
  formatField?: (value: unknown) => unknown;
}

export interface CustomTableRow {
  [key: string | symbol]: unknown;
}
