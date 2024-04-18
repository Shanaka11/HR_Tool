import React from "react";
import { ColumnDef } from "../(components)/Table/types";
import { useTable } from "../(components)/Table/useTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTable from "../(components)/Table/DataTable";

type Project = {
  id: string;
  name: string;
  contactPerson: string;
};

const projects: Project[] = [
  {
    id: "1",
    name: "Project A",
    contactPerson: "John Doe",
  },
  {
    id: "2",
    name: "Project B",
    contactPerson: "Alice Smith",
  },
  {
    id: "3",
    name: "Project C",
    contactPerson: "Bob Johnson",
  },
  {
    id: "4",
    name: "Project D",
    contactPerson: "Emma Brown",
  },
  {
    id: "5",
    name: "Project E",
    contactPerson: "Michael Wilson",
  },
  {
    id: "6",
    name: "Project F",
    contactPerson: "Sophia Garcia",
  },
  {
    id: "7",
    name: "Project G",
    contactPerson: "David Martinez",
  },
  {
    id: "8",
    name: "Project H",
    contactPerson: "Olivia Rodriguez",
  },
  {
    id: "9",
    name: "Project I",
    contactPerson: "Daniel Hernandez",
  },
  {
    id: "10",
    name: "Project J",
    contactPerson: "Isabella Lopez",
  },
];

const page = () => {
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

  return (
    <>
      <h1>Projects</h1>
      <div className="overflow-x-auto">
        <DataTable data={projects} columnDefinition={columns} />
      </div>
    </>
  );
};

export default page;
