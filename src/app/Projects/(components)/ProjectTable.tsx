"use client";

import DataTable from "@/app/(components)/Table/DataTable";
import DataTableProvider from "@/app/(components)/Table/DataTableProvider";
import { ColumnDef } from "@/app/(components)/Table/types";
import { sleep } from "@/lib/sleep";
import { getDateString } from "@/lib/tableUtils";
import React from "react";
import { z } from "zod";

import { Project } from "../page";

type ProjectTableProps = {
  data: Project[];
};

const ProjectTable: React.FC<ProjectTableProps> = ({ data }) => {
  const columns: ColumnDef<Project>[] = [
    {
      id: "1",
      header: "Id",
      name: "id",
      getValue: (row) => row.id,
      hidden: true,
      columnPermission: "READONLY",
    },
    {
      id: "2",
      name: "name",
      header: "Name",
      getValue: (row) => row.name,
      size: "LARGE",
      setValue: (row, value) => {
        return {
          ...row,
          ["name"]: value,
        };
      },
      validationSchema: z
        .string()
        .max(10, { message: "Name cannot be larger than 10 characters" }),
      columnType: "TEXT",
      columnPermission: "UPSERTONLY",
    },
    {
      id: "3",
      name: "contactPerson",
      header: "Contact Person",
      getValue: (row) => row.contactPerson,
      size: "MEDIUM",
      setValue: (row, value) => {
        return {
          ...row,
          ["contactPerson"]: value,
        };
      },
      columnType: "TEXT",
      columnPermission: "UPSERTONLY",
      validationSchema: z.string(),
    },
    {
      id: "4",
      name: "age",
      header: "Age",
      getValue: (row) => getDateString(row.age),
      size: "MEDIUM",
      setValue: (row, value) => {
        return {
          ...row,
          ["age"]: new Date(value),
        };
      },
      columnType: "DATE",
      validationSchema: z.date(),
      columnPermission: "UPSERTONLY",
    },
  ];

  const handleDelete = async (dataToBeDeleted: Project[]) => {
    await sleep(2000);
    console.log(dataToBeDeleted);
    throw new Error("Could not be deleted");
  };

  const handleUpdate = async (dataToBeUpdated: Project[]) => {
    await sleep(2000);
    console.log(dataToBeUpdated);
  };

  const handleCreate = async (dataToBeCreated: Project[]) => {
    await sleep(2000);
    console.log(dataToBeCreated);
    return dataToBeCreated;
  };

  return (
    <DataTableProvider>
      <DataTable
        data={data}
        columnDefinition={columns}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        handleCreate={handleCreate}
      />
    </DataTableProvider>
  );
};

export default ProjectTable;
