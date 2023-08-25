import { getServerSession } from "next-auth";
import { OPTIONS } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(OPTIONS);
  return (
    <main className="mt-5">
      {session ? (
        <>
          <h1 className="py-3 text-4xl text-center text-base-content">
            {`Hello, ${session.user.name}!`}
          </h1>
          <h2 className="text-2xl text-center text-base-content">
            Welcome to Film Log! Here you can keep track of your rolls of film.
          </h2>
          <h3 className="mt-4 text-xl text-center md:hidden">
            To get started click the menu on the top right and press &quot;See
            my Film Log&quot;
          </h3>
          <h3 className="hidden mt-4 text-xl text-center md:block">
            To get started, press &quot;See My Film Log&quot; above
          </h3>
        </>
      ) : (
        <>
          <h2 className="text-3xl text-center text-base-content">
            Welcome to Film Log! Here you can keep track of your rolls of film.
          </h2>
          <h3 className="mt-4 text-xl text-center">
            To get Started, please log in using either GitHub or Gmail
          </h3>
        </>
      )}
    </main>
  );
}
