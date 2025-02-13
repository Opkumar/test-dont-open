import client from "@/lib/sanity";
import TeamPage from "@/app/components/TeamPage";

async function getTeamMembers() {
  const query = `*[_type == "teamMember"] {
    name,
    role,
    image,
    phone,
    email,
    linkedin,
    expertise,
    workOfExperience,
    qualifications,
    desc
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function TeamPageServer() {
  const teamMembers = await getTeamMembers();

  // Pass the fetched data to the Client Component
  return <TeamPage teamMembers={teamMembers} />;
}
