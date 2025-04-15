import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // Replace with your Sanity Project ID
  dataset: import.meta.env.VITE_SANITY_DATASET, // Change if you use a different dataset
  apiVersion: "2025-03-27", // Use the latest API version
  useCdn: true, // Faster fetching
});

const builder = imageUrlBuilder(client);
export { client };
export const urlFor = (source) => builder.image(source);
