'use client';
import { Getter, PrimitiveAtom, Setter, atom } from 'jotai';
import { splitAtom } from 'jotai/utils';
import { ColumnDef, RowDef } from './types';

const loadRows = (set: Setter, data: unknown[]) => {
	const rowData = data.map((dataItem) => {
		return {
			selected: false,
			markedFor: 'READ' as const,
			dataItem: dataItem,
		};
	});
	set(rowsAtom, rowData);
	set(originalRowsAtom, rowData);
};

const setColumnDefinitions = (set: Setter, columns: ColumnDef<any>[]) => {
	set(
		colsAtom,
		columns.filter((column) => !column.hidden)
	);
};

const allRowsSelected = (get: Getter) => {
	const rows = get(rowsAtom);

	if (rows.length === 0) return false;

	for (let i = 0; i < rows.length; i++) {
		if (!rows[i].selected) return false;
	}
	return true;
};

const handleSelectAll = (get: Getter, set: Setter) => {
	const allSelected = get(allRowsSelectedAtom);
	set(rowsAtom, (prev) => {
		return prev.map((row) => {
			return { ...row, selected: !allSelected };
		});
	});
	set(selectedRowIndexAtom, [-1]);
};

const handleRowSelect = (
	get: Getter,
	set: Setter,
	rowAtom: PrimitiveAtom<RowDef<any>>,
	holdShift: boolean,
	index: number
) => {
	const selectedIndex = get(selectedRowIndexAtom);

	// If selectedindex[0] = -1 then ignore the shift
	// If shift is pressed
	if (holdShift && selectedIndex[0] !== -1) {
		// If current index is larger than the last index then everything between last index and the current index should be selected
		if (index > selectedIndex[0]) {
			set(rowsAtom, (prev) => {
				return prev.map((row, rowIndex) => {
					if (rowIndex <= index && rowIndex > selectedIndex[0]) {
						return { ...row, selected: true };
					}
					if (!selectedIndex.includes(rowIndex)) {
						return { ...row, selected: false };
					}
					return { ...row, selected: true };
				});
			});
			return;
		}
		// if current index is smaller than the last index then everything between current inedx nand the last index should be selected
		set(rowsAtom, (prev) => {
			return prev.map((row, rowIndex) => {
				if (rowIndex >= index && rowIndex < selectedIndex[0]) {
					return { ...row, selected: true };
				}
				if (!selectedIndex.includes(rowIndex)) {
					return { ...row, selected: false };
				}
				return { ...row, selected: true };
			});
		});
		return;
	}

	const row = get(rowAtom);
	if (!row.selected) {
		set(selectedRowIndexAtom, (prev) => [index, ...prev]);
	} else {
		set(selectedRowIndexAtom, (prev) => prev.toSpliced(0, 1));
	}

	set(rowAtom, (prev) => {
		return { ...prev, selected: !prev.selected };
	});
};

const handleMarkDelete = (get: Getter, set: Setter) => {
	set(tableStateAtom, 'DELETE');
	set(rowsAtom, (prev) => {
		return prev.map((row) => {
			if (row.selected) {
				return {
					...row,
					markedFor: 'DELETE',
				};
			}
			return row;
		});
	});
};

const handleAllowMarkDelete = (get: Getter) => {
	const tableState = get(tableStateAtom);

	if (tableState !== 'READ') return true;

	const rows = get(rowsAtom);
	for (let i = 0; i < rows.length; i++) {
		if (rows[i].selected) return false;
	}
	return true;
};

const handleMarkCancel = (get: Getter, set: Setter) => {
	const tableState = get(tableStateAtom);
	if (tableState === 'UPDATE' || tableState === 'CREATE') {
		const originalRows = get(originalRowsAtom);
		set(rowsAtom, originalRows);
		set(tableStateAtom, 'READ');
		return;
	}
	set(rowsAtom, (prev) => {
		return prev.map((row) => {
			return {
				...row,
				selected: false,
				markedFor: 'READ',
			};
		});
	});
	set(tableStateAtom, 'READ');
};

const handleAllowMarkCancel = (get: Getter) => {
	return get(tableStateAtom) === 'READ';
};

const handleMarkUpdate = (get: Getter, set: Setter) => {
	set(tableStateAtom, 'UPDATE');
	set(rowsAtom, (prev) => {
		return prev.map((row) => {
			if (row.selected) {
				return {
					...row,
					markedFor: 'UPDATE',
				};
			}
			return row;
		});
	});
};
// Jotai

export const rowsAtom = atom<RowDef<unknown>[]>([]);
export const originalRowsAtom = atom<RowDef<unknown>[]>([]);
export const rowAtoms = splitAtom(rowsAtom);
export const selectedRowIndexAtom = atom<number[]>([-1]);

// Load data to table
export const loadRowsAtom = atom(
	() => '',
	(get, set, data: unknown[]) => {
		loadRows(set, data);
	}
);
// Click Select All
export const selectAllAtom = atom(() => '', handleSelectAll);
// Select All
export const allRowsSelectedAtom = atom(allRowsSelected);
// Shift Click
export const selectRowAtom = atom(() => '', handleRowSelect);

// Table state
export const tableStateAtom = atom<'CREATE' | 'READ' | 'UPDATE' | 'DELETE'>(
	'READ'
);
// Allow Mark Delete / Update
export const allowMarkDeleteAtom = atom(handleAllowMarkDelete);
// Mark Delete
export const markDeleteRowAtom = atom(() => '', handleMarkDelete);

// Allow Cancel Mark
export const allowCancelMarkAtom = atom(handleAllowMarkCancel);
// Cancle Mark
export const cancleRowMarkAtom = atom(() => '', handleMarkCancel);

// Mark Update
export const markUpdateRowAtom = atom(() => '', handleMarkUpdate);
// Column Definition
export const colsAtom = atom<ColumnDef<any>[]>([]);

export const loadColsAtom = atom(
	() => '',
	(get, set, columns: ColumnDef<any>[]) => setColumnDefinitions(set, columns)
);
