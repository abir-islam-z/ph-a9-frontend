import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    return notFound();
  }
  return <>{children}</>;
}
