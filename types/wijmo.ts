import { DataType } from "@grapecity/wijmo";
import type { ICellTemplateFunction } from "@grapecity/wijmo.grid";
export { DataType };

export type Column = {
  binding: string;
  header: string;
  dataType: DataType;
  isReadOnly?: boolean;
  visible?: boolean;
  width?: number;
  cssClass?: string;
  cellTemplate?: ICellTemplateFunction;
};
