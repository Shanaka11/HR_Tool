import React from "react";
import { z } from "zod";

import ProjectTable from "./(components)/ProjectTable";

export const ProjectRoleEnum = z.enum(["TEACHER", "STUDENT"]);
export type ProjectRoleEnumType = z.infer<typeof ProjectRoleEnum>;

export type Project = {
  id: string;
  name: string;
  contactPerson: string;
  age?: Date;
  adult?: boolean;
  role?: ProjectRoleEnumType;
};

const projects: Project[] = [
  {
    id: "1",
    name: "Project A",
    contactPerson: "John Doe",
    adult: true,
  },
  {
    id: "2",
    name: "Project B",
    contactPerson: "Alice Smith",
    age: new Date(),
  },
  {
    id: "3",
    name: "Project C",
    contactPerson: "Bob Johnson",
    role: ProjectRoleEnum.Enum.STUDENT,
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
  return (
    <>
      <h1>Projects</h1>
      <div className="overflow-x-auto">
        <ProjectTable data={projects} />
      </div>
    </>
  );
};

export default page;
