"use server";

import { Company } from "@/app/Projects/page";
import { sleep } from "@/lib/sleep";

const companies: Company[] = [
  {
    id: "1",
    name: "My Company",
  },
  {
    id: "2",
    name: "Your Company",
  },
  {
    id: "3",
    name: "His Company",
  },
  {
    id: "4",
    name: "Her Company",
  },
];

export const getCompanyByKey = async (name?: string) => {
  await sleep(2000);
  if (name) {
    return companies.filter((company) => company.name === name);
  }
  return companies;
};

export const getCompanyById = async (id: string) => {
  await sleep(2000);
  return companies.filter((company) => company.id === id);
};
