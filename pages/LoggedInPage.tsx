import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";

const LoggedInPage = (props: any) => {
  const [currentUserData, setUserCurrentData] = useState({
    id: 0,
    username: "",
    password: "",
    email: "",
  });
  const { query } = useRouter();
  const userId = Object.keys(query)[0];
  useEffect(() => {
    const getchUserData = async () => {
      const userNameRespoanse = await fetch(
        `http://localhost:4000/users/${userId}`
      );
      const userNameData = await userNameRespoanse.json();
      setUserCurrentData(userNameData);
    };
    getchUserData();
  }, []);

  console.log(currentUserData);

  return (
    <div>
      <p>ID - {currentUserData.id}</p>
      <p>UserName - {currentUserData.username}</p>
      <p>Email - {currentUserData.email}</p>
    </div>
  );
};

export default LoggedInPage;
