import Head from "next/head";
import React from "react";
import Layout from "../layout/layout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormik } from "formik";

import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineUsers } from "react-icons/hi";

type passType = {
  password: boolean;
  cpassword: boolean;
};

type errorType = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};

/*
const validate = (values: any) => {
  const errors: errorType = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
  };

  if (values.username === "") {
    errors.username = "username Required";
  } else if (values.username.length < 8) {
    errors.username = "username should not be less than 8 letters";
  }

  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Password length must be greater than 8 and less than 20";
  } else if (values.password === "") {
    errors.password = "Invalid Password";
  }

  if (!values.cpassword) {
    errors.cpassword = "required";
  } else if (values.cpassword.length < 8 || values.cpassword.length > 20) {
    errors.cpassword =
      "Password length must be greater than 8 and less than 20";
  } else if (values.cpassword === "") {
    errors.cpassword = "Invalid Password";
  } else if (values.password != values.cpassword) {
    errors.cpassword = "It doesn't match the password";
  }

  return errors;
};

*/

const Register = () => {
  const [show, setShow] = useState<passType>({
    password: false,
    cpassword: false,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
    },
  });

  return (
    <Layout>
      <Head>
        <title>Register Page</title>
      </Head>
      <section className="3/3 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold ">Register</h1>
          <p className="3/4 mx-auto text-gray-400 "></p>
        </div>
        <form className="flex flex-col gap-5" onClick={formik.handleSubmit}>
          <div className={styles.input_group}>
            <input
              type="text"
              placeholder="username"
              className={styles.input_text}
              {...formik.getFieldProps("username")}
            />
            <span className="icon flex item-center px-4 py-3">
              <HiOutlineUsers size={24} />
            </span>
          </div>

          <div className={styles.input_group}>
            <input
              type="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex item-center px-4 py-3">
              <HiAtSymbol size={24} />
            </span>
          </div>

          <div className={styles.input_group}>
            <input
              type={show.password ? "text" : "password"}
              placeholder="password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex item-center px-4 py-4"
              onClick={() => {
                setShow({ password: !show.password, cpassword: false });
              }}
            >
              <HiFingerPrint size={24} />
            </span>
          </div>

          <div className={styles.input_group}>
            <input
              type={show.cpassword ? "text" : "password"}
              placeholder="Confirm Password"
              className={styles.input_text}
              {...formik.getFieldProps("cpassword")}
            />
            <span
              className="icon flex item-center px-4 py-4"
              onClick={() => {
                setShow({
                  password: !show.password,
                  cpassword: !show.cpassword,
                });
              }}
            >
              <HiFingerPrint size={24} />
            </span>
          </div>

          <div>
            <button type="submit" className={styles.button}>
              Register
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400 ">
          Have an Account ?
          <Link href={`/login`} className="text-blue">
            Log In
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Register;
