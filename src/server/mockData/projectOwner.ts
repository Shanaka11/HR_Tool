"use server";

import { ProjectOwner } from "@/app/Projects/page";
import { sleep } from "@/lib/sleep";

const projectOwners: ProjectOwner[] = [
  {
    id: "1",
    company: "My Company",
    name: "Me",
  },
  {
    id: "2",
    company: "My Company",
    name: "Machan",
  },
  {
    id: "3",
    company: "My Company",
    name: "Ado",
  },
  {
    id: "4",
    company: "Your Company",
    name: "Ela",
  },
];

// Finish implementation
export const getProjectOwnerByKeys = async ({
  company,
  name,
  searchString,
}: {
  company?: string;
  name?: string;
  searchString?: string;
}) => {
  await sleep(2000);

  if (
    name !== undefined &&
    name !== "" &&
    company !== undefined &&
    company !== ""
  ) {
    console.log("1");
    return projectOwners.filter(
      (projectOwner) =>
        projectOwner.name === name && projectOwner.company === company,
    );
  }

  if (company !== undefined && company !== "") {
    return projectOwners.filter(
      (projectOwner) => projectOwner.company === company,
    );
  }

  if (name !== undefined && name !== "") {
    return projectOwners.filter((projectOwner) => projectOwner.name === name);
  }
  return projectOwners;
};

export const getProjectOwnerById = async (id: string) => {
  await sleep(2000);
  return projectOwners.filter((projectOwner) => projectOwner.id === id);
};
