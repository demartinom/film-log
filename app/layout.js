import "./globals.css";
import Provider from "@/components/Provider";
import LoginButton from "@/components/loginButton";
import { getServerSession } from "next-auth";
import { OPTIONS } from "./api/auth/[...nextauth]/route";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import { FaBars } from "react-icons/fa6";

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
              <div className="hidden md:inline-flex navbar-center">
                <Suspense fallback={<Loading />}>
                  <Link href="/filmlog">
                    <h1 className="text-lg">See My Film Log</h1>
                  </Link>
                </Suspense>
              </div>
            )}
            <div className="hidden mr-3 navbar-end md:inline-flex">
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
            <div className="z-20 navbar-end md:hidden drawer drawer-end">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <label htmlFor="my-drawer" className="drawer-button">
                  {<FaBars />}
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="h-full p-4 menu w-80 bg-base-200 text-base-content">
                  {/* Sidebar content here */}
                  <li>
                    <div className="flex flex-col text-xl">
                      {session ? (
                        <>
                          <Image
                            src={session.user.image}
                            alt="user image"
                            width={50}
                            height={50}
                            className="rounded-full"
                          ></Image>
                          <p>{session.user.email}</p>
                        </>
                      ) : (
                        <>
                          <Image
                            src="/logged-out.jpg"
                            alt="logged out"
                            width={50}
                            height={50}
                            className="rounded-full"
                          ></Image>
                          <p>Please Log In</p>
                        </>
                      )}
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-center text-xl">
                      <LoginButton />
                    </div>
                  </li>
                  <li>
                    <Link href="/filmlog" className="flex justify-center">
                      <h1 className="text-xl">See My Film Log</h1>
                    </Link>
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
