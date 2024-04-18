import { atom } from "jotai";
import { splitAtom } from "jotai/utils";
import { RowDef } from "./types";

export const rowsAtom = atom<RowDef<unknown>[]>([]);
export const rowAtoms = splitAtom(rowsAtom);
