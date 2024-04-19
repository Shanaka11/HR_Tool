'use client';
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React, { useRef } from 'react';
import { ColumnDef, ColumnSize, RowDef } from './types';
import { Checkbox } from '@/components/ui/checkbox';
import DataTableRow from './DataTableRow';
import {
	PrimitiveAtom,
	useAtom,
	useAtomValue,
	useSetAtom,
	useStore,
} from 'jotai';
import {
	allRowsSelectedAtom,
	colsAtom,
	loadColsAtom,
	loadRowsAtom,
	newRowAtoms,
	newRowsAtom,
	rowAtoms,
	rowsAtom,
	selectAllAtom,
	tableStateAtom,
} from './DataTableStore';
import DataTableToolaBar from './DataTableToolaBar';

export type BaseDataItem = {
	id: string;
};

type DataTableProps<T extends BaseDataItem> = {
	data: T[];
	columnDefinition: ColumnDef<T>[];
	handleDelete: (dataToBeDeleted: T[]) => void;
	handleUpdate: (dataToBeUpdated: T[]) => void;
	handleCreate: (dataToBeCreated: T[]) => void;
};

const DataTable = <T extends BaseDataItem>({
	data,
	columnDefinition,
	handleDelete,
	handleUpdate,
	handleCreate,
}: DataTableProps<T>) => {
	const store = useStore();
	const loaded = useRef(false);
	const loadRows = useSetAtom(loadRowsAtom, {
		store: store,
	});

	const loadCols = useSetAtom(loadColsAtom);
	const columns = useAtomValue(colsAtom);

	if (!loaded.current) {
		loadCols(columnDefinition);
		loadRows(data);
		loaded.current = true;
	}

	const allSelected = useAtomValue(allRowsSelectedAtom, {
		store: store,
	});

	const [rowAtom] = useAtom(rowAtoms, { store });
	const newRows = useAtomValue(newRowsAtom, { store });
	const rows = useAtomValue(rowsAtom, { store });
	const [newRowAtom] = useAtom(newRowAtoms, { store });
	const handleSelectAllClick = useSetAtom(selectAllAtom, { store: store });
	const tableState = useAtomValue(tableStateAtom, { store });

	const getColWidth = (size?: ColumnSize) => {
		if (size === 'LARGE') return 'w-64';
		if (size === 'MEDIUM') return 'w-40';
		if (size === 'SMALL') return 'w-20';
		return 'w-auto min-w-40';
	};

	const handleSaveOnClick = () => {
		if (tableState === 'CREATE') {
			const newData = newRows.map((row) => row.dataItem) as T[];
			handleCreate(newData);
		}
		if (tableState === 'DELETE') {
			// When removing
			const remData = rows
				.filter((row) => row.markedFor === 'DELETE')
				.map((row) => row.dataItem) as T[];
			handleDelete(remData);
			return;
		}

		if (tableState === 'UPDATE') {
			const updatedData = rows
				.filter((row) => row.markedFor === 'UPDATE')
				.map((row) => row.dataItem) as T[];
			handleUpdate(updatedData);
		}
	};

	return (
		<>
			{/* Table Toolbar */}
			<DataTableToolaBar handleSave={handleSaveOnClick} />
			<Table className='border-collapse table-fixed min-w-full'>
				<TableHeader>
					<TableRow>
						<TableHead scope='row' className='w-8'>
							<Checkbox
								className='block'
								onClick={handleSelectAllClick}
								checked={allSelected}
								disabled={tableState !== 'READ'}
							/>
						</TableHead>
						{columns.map((header) => (
							<TableHead
								scope='col'
								key={header.id}
								className={`${getColWidth(header.size)}`}
							>
								{header.header}
							</TableHead>
						))}
						{/* Dummy col to fill the remaining widht */}
						<TableHead className='w-auto'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<>
						{newRowAtom.map((rowAtom, index) => (
							<DataTableRow
								rowAtom={rowAtom as PrimitiveAtom<RowDef<T>>}
								key={rowAtom.toString()}
								index={index}
							/>
						))}
					</>
					<>
						{rowAtom.map((rowAtom, index) => (
							<DataTableRow
								rowAtom={rowAtom as PrimitiveAtom<RowDef<T>>}
								key={rowAtom.toString()}
								index={index}
							/>
						))}
					</>
				</TableBody>
			</Table>
		</>
	);
};

export default DataTable;
