import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { ColumnSize } from './types';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import { allRowsSelectedAtom, colsAtom, selectAllAtom } from './DataTableStore';
import DataTableSelectAll from './DataTableSelectAll';

const DataTableHeader = () => {
	const store = useStore();
	const columns = useAtomValue(colsAtom, { store });

	const getColWidth = (size?: ColumnSize) => {
		if (size === 'LARGE') return 'w-64';
		if (size === 'MEDIUM') return 'w-40';
		if (size === 'SMALL') return 'w-20';
		return 'w-auto min-w-40';
	};
	return (
		<TableHeader>
			<TableRow>
				<TableHead scope='row' className='w-8'>
					<DataTableSelectAll />
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
	);
};

export default DataTableHeader;
