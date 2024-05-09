"use client";

import DataTable from "@/app/(components)/Table/DataTable";
import DataTableProvider from "@/app/(components)/Table/DataTableProvider";
import { ColumnDef } from "@/app/(components)/Table/types";
import { sleep } from "@/lib/sleep";
import { getDateString } from "@/lib/tableUtils";
import { getCompanyByKey } from "@/server/mockData/company";
import { getProjectOwnerByKeys } from "@/server/mockData/projectOwner";
import React from "react";
import { z } from "zod";

import {
  Company,
  Project,
  ProjectOwner,
  ProjectRoleEnum,
  ProjectRoleEnumType,
} from "../page";

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
      columnType: "TEXT",
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
          ["name"]: value ?? "",
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
          ["contactPerson"]: value ?? "",
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
          ["age"]: value === undefined ? undefined : new Date(value),
        };
      },
      columnType: "DATE",
      validationSchema: z.date(),
      columnPermission: "UPSERTONLY",
    },
    {
      id: "5",
      name: "adult",
      header: "Adult",
      getValue: (row) => row.adult?.toString(),
      columnPermission: "UPSERTONLY",
      columnType: "BOOLEAN",
      size: "SMALL",
      setValue: (row, value) => {
        return {
          ...row,
          ["adult"]: value,
        };
      },
      validationSchema: z.boolean(),
    },
    {
      id: "6",
      name: "role",
      header: "Role",
      columnType: "ENUM",
      columnPermission: "UPSERTONLY",
      getValue: (row) => row.role,
      size: "MEDIUM",
      setValue: (row, value) => {
        return {
          ...row,
          ["role"]: value as ProjectRoleEnumType,
        };
      },
      validationSchema: ProjectRoleEnum.optional(),
      enumValues: ProjectRoleEnum.options,
    },
    {
      // TODO: this should be an lov from the company entity, whenever we select a company from here owner name should be reset to null
      id: "7",
      name: "projectOwnerCompany",
      header: "Company",
      columnType: "LOV",
      columnPermission: "UPSERTONLY",
      getValue: (row) => row.projectOwnerCompany,
      size: "LARGE",
      setValue: (row, value?: Company) => {
        return {
          ...row,
          ["projectOwnerCompany"]: value?.name,
          ["projectOwnerName"]: "",
        };
      },
      validationSchema: z.string().max(10),
      getLovOptions: async (row, searchString) => {
        const companies = await getCompanyByKey({
          searchString,
        });
        return companies.map((company) => {
          return {
            id: company.id,
            displayName: company.name,
            item: company,
          };
        });
      },
    },
    {
      id: "8",
      name: "projectOwnerName",
      header: "Owner Name",
      columnType: "LOV",
      columnPermission: "UPSERTONLY",
      getValue: (row) => row?.projectOwnerName,
      size: "LARGE",
      // Value should be a ProjectOwner type
      setValue: (row, value?: ProjectOwner) => {
        return {
          ...row,
          ["projectOwnerCompany"]: value?.company ?? row.projectOwnerCompany,
          ["projectOwnerName"]: value?.name ?? "",
        };
      },
      validationSchema: z.string().max(10),
      getLovOptions: async (row, searchString) => {
        const projects = await getProjectOwnerByKeys({
          company: row.projectOwnerCompany,
          searchString,
        });
        return projects.map((project) => {
          return {
            id: project.id,
            displayItem: {
              Name: project.name,
              Company: project.company,
            },
            displayName: project.name,
            item: project,
          };
        });
      },
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
