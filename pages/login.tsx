import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Layout from "../layout/layout";
import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import LoggedInPage from "./LoggedInPage";
import Router, { useRouter } from "next/router";

const validate = (values: any) => {
  const errors: any = {};
  if (!values.email) {
    errors.error_email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.error_email = "Invalid email address";
  }

  if (!values.password) {
    errors.error_password = "required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.error_password =
      "Password length must be greater than 8 and less than 20";
  }

  return errors;
};

const Login = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  //formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate,

    onSubmit: async (values) => {
      console.log(values);
      const userName = await fetch(
        `http://localhost:4000/users?email=${values.email}`
      );
      const userData = await userName.json();
      console.log(userData, " length ", userData.length);
      if (userData.length == 0) {
        console.log("Invalid email id");
      } else if (userData[0].password !== values.password) {
        console.log("Invalid Password");
      } else if (
        userData[0].email === values.email &&
        userData[0].password === values.password
      ) {
        console.log("Successful Login", userData[0]);
        router.push({
          pathname: "/LoggedInPage",
          query: JSON.stringify(userData[0].id),
        });
      }
    },
  });

  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };

  const handleGithubSignIn = async () => {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  };

  let userError = formik.errors;
  console.log(userError);
  return (
    <Layout>
      <Head>
        <title>Login Page</title>
      </Head>

      <section className="3/3 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold ">Log In</h1>
          <p className="3/4 mx-auto text-gray-400 "></p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="email"
              className={styles.input_text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <span className="icon flex item-center px-4 py-3">
              <HiAtSymbol size={24} />
            </span>
          </div>

          <div className={styles.input_group}>
            <input
              type={show ? "text" : "password"}
              placeholder="password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex item-center px-4 py-4"
              onClick={() => {
                setShow(!show);
              }}
            >
              <HiFingerPrint size={24} />
            </span>
          </div>

          <div>
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div>
            <button
              type="button"
              className={styles.button_custom}
              onClick={handleGoogleSignIn}
            >
              Sign In with Google{" "}
              <Image
                src="/asset/googleLogo.png"
                alt="Google"
                width="20"
                height="20"
              ></Image>
            </button>
          </div>
          <div>
            <button
              type="button"
              className={styles.button_custom}
              onClick={handleGithubSignIn}
            >
              Sign In with Github
              <Image
                src="/asset/githubLogo.png"
                alt="Google"
                width="30"
                height="30"
              ></Image>
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400 ">
          Don't have and account ?
          <Link href={`/register`} className="text-blue">
            Sign Up
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Login;
