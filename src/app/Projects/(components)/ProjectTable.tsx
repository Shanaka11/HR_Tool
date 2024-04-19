"use client";
import { ColumnDef } from "@/app/(components)/Table/types";
import React from "react";
import { Project } from "../page";
import DataTable from "@/app/(components)/Table/DataTable";
import DataTableProvider from "@/app/(components)/Table/DataTableProvider";

type ProjectTableProps = {
  data: Project[];
};

const ProjectTable: React.FC<ProjectTableProps> = ({ data }) => {
  const columns: ColumnDef<Project>[] = [
    {
      id: "1",
      header: "Id",
      getValue: (row) => row.id,
      hidden: true,
    },
    {
      id: "2",
      header: "Name",
      getValue: (row) => row.name,
      size: "LARGE",
    },
    {
      id: "3",
      header: "Contact Person",
      getValue: (row) => row.contactPerson,
      size: "MEDIUM",
    },
  ];

  const handleDelete = (dataToBeDeleted: Project[]) => {
    console.log(dataToBeDeleted);
  };

  return (
    <DataTableProvider>
      <DataTable
        data={data}
        columnDefinition={columns}
        handleDelete={handleDelete}
      />
    </DataTableProvider>
  );
};

export default ProjectTable;
