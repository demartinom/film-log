import "./globals.css";
import Provider from "@/components/Provider";
import LoginButton from "@/components/loginButton";
import { getServerSession } from "next-auth";
import { OPTIONS } from "./api/auth/[...nextauth]/route";
import Image from "next/image";

export default async function RootLayout({ children }) {
  const session = await getServerSession(OPTIONS);
  return (
    <html lang="en" className="bg-base-100">
      <Provider>
        <body>
          <nav className="navbar bg-primary text-primary-content">
            <div className="flex-1 navbar-start">
              <h1>FilmLog</h1>
            </div>
            <div className="mr-6 navbar-end">
              <div className="dropdown dropdown-end">
                <label tabIndex={0}>
                  {session ? (
                    <Image
                      src={session.user.image}
                      alt="user image"
                      width={50}
                      height={50}
                      className="rounded-full"
                    ></Image>
                  ) : (
                    <Image
                      src="/logged-out.jpg"
                      alt="logged out"
                      width={50}
                      height={50}
                      className="rounded-full"
                    ></Image>
                  )}
                </label>
                <ul className="p-2 mt-3 rounded-md dropdown-content dropdown-end text-end bg-primary-focus">
                  {session && (
                    <>
                      {/* <li >{session.user.name}</li> */}
                      <li>{session.user.email}</li>
                    </>
                  )}
                  <li>
                    <LoginButton />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {children}
        </body>
      </Provider>
    </html>
  );
}
