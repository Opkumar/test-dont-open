"use server";

import payload from "payload";

// Function to insert a new service
export async function insertService(serviceData: {
  title: string;
  description: string;
  slug: string;
  icon: string;
}) {
  try {
    const newService = await payload.create({
      collection: "services",
      data: serviceData,
    });
    console.log("New service created:", newService);
    return newService;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
}

// Function to insert a news item
export async function insertNews(newsData: {
  title: string;
  content: any;
  publishedDate: string;
  slug: string;
}) {
  try {
    const newNews = await payload.create({
      collection: "news",
      data: newsData,
    });
    console.log("New news item created:", newNews);
    return newNews;
  } catch (error) {
    console.error("Error creating news item:", error);
    throw error;
  }
}

// Function to insert a team member
export async function insertTeamMember(memberData: {
  name: string;
  position: string;
  bio: string;
  image: string; // This should be the ID of the uploaded image
}) {
  try {
    const newMember = await payload.create({
      collection: "team",
      data: memberData,
    });
    console.log("New team member created:", newMember);
    return newMember;
  } catch (error) {
    console.error("Error creating team member:", error);
    throw error;
  }
}

// Function to fetch all services
export async function fetchServices() {
  try {
    const services = await payload.find({
      collection: "services",
    });

    console.log(services);
    return services.docs;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

// Function to fetch news items with optional date range
export async function fetchNews(dateRange?: { from: string; to: string }) {
  try {
    const query: any = {
      collection: "news",
      sort: "-publishedDate",
    };

    if (dateRange) {
      query.where = {
        and: [
          {
            publishedDate: {
              greater_than_equal: dateRange.from,
            },
          },
          {
            publishedDate: {
              less_than_equal: dateRange.to,
            },
          },
        ],
      };
    }

    const news = await payload.find(query);
    return news.docs;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

// Function to fetch all team members
export async function fetchTeamMembers() {
  try {
    const members = await payload.find({
      collection: "team",
      populate: {
        image: {
          collection: "media",
        },
      },
    });
    return members.docs;
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw error;
  }
}
