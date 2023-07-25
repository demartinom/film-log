import { getServerSession } from "next-auth";
import { OPTIONS } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(OPTIONS);
  return (
    <main>
      <h1 className="py-3 text-4xl text-center text-base-content">
        {session ? `Hello ${session.user.name}!` : "Please Sign In"}
      </h1>
    </main>
  );
}
