import "./globals.css";
import Provider from "@/components/Provider";
import LoginButton from "@/components/loginButton";
import { getServerSession } from "next-auth";
import { OPTIONS } from "./api/auth/[...nextauth]/route";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";
import Link from "next/link";

export default async function RootLayout({ children }) {
  const session = await getServerSession(OPTIONS);
  return (
    <html lang="en" className="bg-base-100">
      <Provider>
        <body>
          <nav className="navbar bg-info text-info-content">
            <div className="navbar-start">
              <Link href="/">
                <h1 className="text-2xl">FilmLog</h1>
              </Link>
            </div>
            {session && (
              <div className="navbar-center">
                <Link href="/filmlog">
                  <h1 className="text-lg">See My Film Log</h1>
                </Link>
              </div>
            )}
            <div className="mr-3 navbar-end">
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
                  <div className="flex items-center justify-center ">
                    <p>{session ? "Me" : "Log In"}</p>
                    <FaAngleDown />
                  </div>
                </label>
                <ul className="p-2 mt-3 rounded-md dropdown-content dropdown-end text-end bg-info">
                  {session && (
                    <>
                      {/* <li >{session.user.name}</li> */}
                      <li>{session.user.email}</li>
                    </>
                  )}
                  <li className="min-w-max">
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
