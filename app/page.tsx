/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/Home.tsx


import { HomeComponent } from "@/components/maincomponent";
import { PersonSchema, WebsiteSchema } from "@/components/seo/schema-markup";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* SEO Schema Markup */}
      <PersonSchema />
      <WebsiteSchema />
      
      {/* Main content */}
      <HomeComponent />
      {/* Other sections of your home page */}
    </main>
  );
}