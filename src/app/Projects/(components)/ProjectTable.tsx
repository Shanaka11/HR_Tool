'use client';
import { ColumnDef } from '@/app/(components)/Table/types';
import React from 'react';
import { Project } from '../page';
import DataTable from '@/app/(components)/Table/DataTable';
import DataTableProvider from '@/app/(components)/Table/DataTableProvider';

type ProjectTableProps = {
	data: Project[];
};

const ProjectTable: React.FC<ProjectTableProps> = ({ data }) => {
	const columns: ColumnDef<Project>[] = [
		{
			id: '1',
			header: 'Id',
			name: 'id',
			getValue: (row) => row.id,
			hidden: true,
		},
		{
			id: '2',
			name: 'name',
			header: 'Name',
			getValue: (row) => row.name,
			size: 'LARGE',
			setValue: (row, value) => {
				return {
					...row,
					['name']: value,
				};
			},
		},
		{
			id: '3',
			name: 'contactPerson',
			header: 'Contact Person',
			getValue: (row) => row.contactPerson,
			size: 'MEDIUM',
			setValue: (row, value) => {
				return {
					...row,
					['contactPerson']: value,
				};
			},
		},
	];

	const handleDelete = (dataToBeDeleted: Project[]) => {
		console.log(dataToBeDeleted);
	};

	const handleUpdate = (dataToBeUpdated: Project[]) => {
		console.log(dataToBeUpdated);
	};

	return (
		<DataTableProvider>
			<DataTable
				data={data}
				columnDefinition={columns}
				handleDelete={handleDelete}
				handleUpdate={handleUpdate}
			/>
		</DataTableProvider>
	);
};

export default ProjectTable;
