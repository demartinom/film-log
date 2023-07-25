import { getServerSession } from "next-auth";
import { OPTIONS } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(OPTIONS);
  return (
    <main>
      {session ? <h1>Hello {session.user.name}!</h1> : <h1>Please Sign In!</h1>}
    </main>
  );
}
