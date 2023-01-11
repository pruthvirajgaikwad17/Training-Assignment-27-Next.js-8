import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status: loading } = useSession();

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      {session ? User({ session }) : <Guest />}
    </>
  );
}

function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Home Page</h3>
      <div className="flex justify-center">
        <Link
          href="/login"
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50 "
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}

function User({ session }: any) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorize User Home Page</h3>
      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button
          className="m-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link
          href="/profile"
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50 "
        >
          Profile Page
        </Link>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}
