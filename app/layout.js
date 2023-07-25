import "./globals.css";
import Provider from "@/components/Provider";
import LoginButton from "@/components/loginButton";
import { getServerSession } from "next-auth";
import { OPTIONS } from "./api/auth/[...nextauth]/route";
import Image from "next/image";

export default async function RootLayout({ children }) {
  const session = await getServerSession(OPTIONS);
  return (
    <html lang="en">
      <Provider>
        <body>
          <nav className="navbar bg-slate-600">
            <div className="navbar-start flex-1">
              <h1>FilmLog</h1>
            </div>

            <div className="navbar-end mr-6">
              <div className="dropdown dropdown-hover ">
                <label>
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
                <ul className="dropdown-content">
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
