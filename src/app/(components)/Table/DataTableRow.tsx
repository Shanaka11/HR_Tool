import { TableCell, TableRow } from '@/components/ui/table';

import {
	PrimitiveAtom,
	useAtom,
	useAtomValue,
	useSetAtom,
	useStore,
} from 'jotai';
import React from 'react';
import { BaseDataItem } from './DataTable';
import { RowDef } from './types';
import { Checkbox } from '@/components/ui/checkbox';
import { colsAtom, selectRowAtom, tableStateAtom } from './DataTableStore';

type DataTableRowProps<T extends BaseDataItem> = {
	rowAtom: PrimitiveAtom<RowDef<T>>;
	index: number;
};

const DataTableRow = <T extends BaseDataItem>({
	rowAtom,
	index,
}: DataTableRowProps<T>) => {
	const store = useStore();
	const [row, setRow] = useAtom(rowAtom, {
		store,
	});
	const handleRowSelect = useSetAtom(selectRowAtom, {
		store,
	});

	const columns = useAtomValue(colsAtom, { store });
	const tableState = useAtomValue(tableStateAtom, { store });

	const handleRowSelectOnClick = (holdShift: boolean) => {
		handleRowSelect(rowAtom, holdShift, index);
	};

	const handleValueUpdate = (
		value: string,
		updateFunction?: (row: any, value: string | number | symbol) => any
	) => {
		if (updateFunction === undefined)
			throw new Error('setValue function undefined in the column defintion');
		setRow((prev) => {
			return {
				...prev,
				dataItem: updateFunction(prev.dataItem, value),
			};
		});
	};

	if (row.markedFor === 'UPDATE' || row.markedFor === 'INSERT') {
		return (
			<TableRow>
				<TableCell>
					<Checkbox className='block' checked={row.selected} disabled={true} />
				</TableCell>
				{columns.map((column) => (
					<TableCell key={`${row.dataItem.id}-${column.header}`}>
						{/* Dependint on the column type show the correct input type */}
						<input
							defaultValue={column.getValue(row.dataItem) as string}
							className='border'
							onBlur={(event) =>
								handleValueUpdate(event.target.value, column.setValue)
							}
						/>
					</TableCell>
				))}
			</TableRow>
		);
	}
	return (
		<TableRow
			key={row.dataItem.id}
			className={row.markedFor === 'DELETE' ? 'line-through' : ''}
		>
			<TableCell>
				<Checkbox
					className='block'
					onClick={(event) => handleRowSelectOnClick(event.shiftKey)}
					checked={row.selected}
					disabled={tableState !== 'READ'}
				/>
			</TableCell>
			{columns.map((column) => (
				<TableCell key={`${row.dataItem.id}-${column.header}`}>
					{column.getValue(row.dataItem) as string}
				</TableCell>
			))}
		</TableRow>
	);
};

export default DataTableRow;
