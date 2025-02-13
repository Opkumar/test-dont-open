"use server";

import client from "@/lib/sanity";

export async function getTeamMembers() {
  const query = `*[_type == "teamMember"] {
    name,
    role,
    image,
    qualifications
  }`;
  const data = await client.fetch(query);
  return data;
}
