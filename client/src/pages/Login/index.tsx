import React, { useState } from "react";
import { Input, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { LOGIN } from "src/graphql/authentication";
import { Authentication, UserInfoAuthentication } from "src/types";

export const Login: React.FC = () => {
  const [loginInput, setLoginInput] = useState<Authentication>({});

  const [doLogin] = useMutation(LOGIN, {
    onCompleted: (data) => {
      console.log(data);
      if (data.success) {
        localStorage.setItem("token", data.token);

        const userInfo = {
          userId: data.userId,
          username: loginInput?.username,
        } as UserInfoAuthentication;
        localStorage.setItem("user", JSON.stringify(userInfo));
      }
    },
  });

  const handleLogin = () => {
    doLogin({ variables: { loginInput } });
  };

  const handleLoginInputChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };
  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <h2>LOGIN PAGE</h2>
      </div>
      <div>
        <Input
          name="username"
          placeholder="Username"
          onBlur={handleLoginInputChange}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Input
          name="password"
          placeholder="Password"
          type="password"
          onBlur={handleLoginInputChange}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};
