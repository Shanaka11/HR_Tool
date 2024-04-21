import React from "react";

import ProjectTable from "./(components)/ProjectTable";

export type Project = {
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
