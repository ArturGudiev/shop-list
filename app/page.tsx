import Image from "next/image";
import Link from "next/link";
import SignIn from "./components/sign-in";
import LogoutButton from "./components/logout-button";
import SessionDebug from "./components/session-debug";
import GeocodingTest from "./components/geocoding-test";
import { auth } from "@/auth";
import styles from "./page.module.css";

async function getCoords(address: string) {
  // Construct absolute URL for server-side fetch
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  
  const res = await fetch(`${baseUrl}/api/geocode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address }),
  });

  if (!res.ok) {
    console.log(res.text);
    throw new Error("Geocoding failed");
  }

  return res.json();
}

export default async function Home() {
  const session = await auth();
  
  const loginStatus = session?.user 
    ? (session.user.name || session.user.id || "Logged in")
    : "Not logged in";

  // const coords = await getCoords(
  //   "Москва, Красная площадь, 1"
  // );

  // console.log(coords);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />


        <div className={styles.loginGrid}>
          <div><SessionDebug/></div>
          <div>
            <div
              className="mb-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <p className="font-mono text-sm text-gray-800 dark:text-gray-200">
                <span className="font-semibold">Server Status:</span> {loginStatus}
              </p>
            </div>
          </div>
          <div>
            {!session?.user && (
              <SignIn />
            )}
          </div>
          <div>
            {session?.user && (
              <LogoutButton />
            )}
          </div>

        </div>

        <GeocodingTest />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/*<Link*/}
          {/*  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"*/}
          {/*  href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"*/}
          {/*  target="_blank"*/}
          {/*  rel="noopener noreferrer"*/}
          {/*>*/}
          {/*  <Image*/}
          {/*    className="dark:invert"*/}
          {/*    src="/vercel.svg"*/}
          {/*    alt="Vercel logomark"*/}
          {/*    width={20}*/}
          {/*    height={20}*/}
          {/*  />*/}
          {/*  Deploy now*/}
          {/*</Link>*/}

          {session?.user && (
            <>
              <Link
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                href="/items"
                rel="noopener noreferrer"
              >
                <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                />
                Items
              </Link>

              <Link
                className="rounded-full border pborder-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                href="/map"
                rel="noopener noreferrer"
              >
                <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                />
                Map
              </Link>
            </>
          )}

        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to arturgudiev.org →
        </a>
      </footer>
    </div>
  );
}
