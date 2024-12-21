// src/app/ServerLayout.tsx
import { cookies } from "next/headers"; // Server-only import
import RootLayout from "./RootLayout"; // Import the client component layout

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the cookies on the server side
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  // Pass token as a prop to the client component
  return <RootLayout token={token}>{children}</RootLayout>;
}
