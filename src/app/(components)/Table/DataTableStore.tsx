import { atom } from "jotai";
import { splitAtom } from "jotai/utils";
import { RowDef } from "./types";

export const rowsAtom = atom<RowDef<unknown>[]>([]);
export const rowAtoms = splitAtom(rowsAtom);
export const loadRowsAtom = atom(
  () => "",
  (get, set, data: unknown[]) => {
    set(
      rowsAtom,
      data.map((dataItem) => {
        return {
          selected: false,
          markedFor: "READ" as const,
          dataItem: dataItem,
        };
      })
    );
  }
);
