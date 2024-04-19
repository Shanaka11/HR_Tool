export type ColumnDef<T> = {
	id: string;
	name: string; // Column identifier
	header: string; // Column label
	getValue: (row: T) => (string & {}) | keyof T;
	defaultValue?: keyof T;
	size?: ColumnSize;
	setValue?: (row: T, value: keyof T) => T;
	editable?: boolean;
	insertable?: boolean;
	sortable?: boolean;
	hidden?: boolean;
	filterable?: boolean;
};

export type RowDef<T> = {
	selected: boolean;
	markedFor: MarkedFor;
	dataItem: T;
};

export type ColumnSize = 'SMALL' | 'MEDIUM' | 'LARGE';
export type MarkedFor = 'DELETE' | 'INSERT' | 'UPDATE' | 'READ';
