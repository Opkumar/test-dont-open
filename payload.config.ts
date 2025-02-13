import sharp from "sharp";
import path from "path";
import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define your server URL
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",

  // Admin settings
  admin: {
    user: "users",
  },

  // Define and configure your collections in this array
  collections: [
    // Users collection
    {
      slug: "users",
      auth: true,
      admin: {
        useAsTitle: "email",
      },
      fields: [
        {
          name: "email",
          type: "email",
          required: true,
        },
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "role",
          type: "select",
          options: ["admin", "editor"],
          required: true,
        },
      ],
    },
    // Services collection
    {
      slug: "services",
      admin: {
        useAsTitle: "title",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
        },
        {
          name: "icon",
          type: "text",
          required: true,
        },
      ],
    },
    // News collection
    {
      slug: "news",
      admin: {
        useAsTitle: "title",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "content",
          type: "richText",
          required: true,
        },
        {
          name: "publishedDate",
          type: "date",
          required: true,
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
        },
      ],
    },
    // Team members collection
    {
      slug: "team",
      admin: {
        useAsTitle: "name",
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "position",
          type: "text",
          required: true,
        },
        {
          name: "bio",
          type: "textarea",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    // Media collection for storing images
    {
      slug: "media",
      upload: {
        staticDir: path.resolve(__dirname, "media"),
      },
      fields: [
        {
          name: "alt",
          type: "text",
        },
      ],
    },
  ],

  // Optional: output TypeScript types and GraphQL schema
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",

  // Whichever Database Adapter you're using should go here
  db: mongooseAdapter({
    url:
      process.env.DATABASE_URI ||
      "mongodb+srv://testuser:hwb9fZ7d2BM6d5CM@cluster0.n5j42.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  }),

  // If you want to resize images, crop, set focal point, etc.
  sharp,
});
