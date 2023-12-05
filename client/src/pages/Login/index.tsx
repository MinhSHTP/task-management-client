import React from "react";
import { Input, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { LOGIN } from "src/graphql/authentication";
import { Authentication, UserInfoAuthentication } from "src/types";
import { useNavigate } from "react-router-dom";
import { APP_PATH } from "@utils";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useForm } from "react-hook-form";

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const nav = useNavigate();
  const [doLogin] = useMutation(LOGIN, {
    onCompleted: (res) => {
      const data = res?.login;
      if (data.success) {
        localStorage.setItem("token", data.token);

        const userInfo = {
          userId: data.userId,
          username: watch("username"),
        } as UserInfoAuthentication;
        localStorage.setItem("user", JSON.stringify(userInfo));
        nav(APP_PATH.DASHBOARD_ROUTE);
      }
    },
  });

  const handleLogin = (data: Authentication) => {
    doLogin({ variables: { loginInput: data } });
  };

  return (
    <Grid2
      container
      padding={2}
      spacing={2}
      direction="column"
      alignContent="center"
      justifyContent="center"
    >
      <Grid2>
        <h2>TASK MANAGEMENT</h2>
      </Grid2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Grid2
          container
          spacing={2}
          direction="column"
          alignContent="center"
          justifyContent="center"
        >
          <Grid2>
            <Input
              placeholder="Username"
              {...register("username", { required: true })}
            />
          </Grid2>
          {errors.username && <Grid2 color="red">Username is required</Grid2>}

          <Grid2>
            <Input
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
          </Grid2>
          {errors.password && <Grid2 color="red">Password is required</Grid2>}

          <Grid2
            container
            padding={4}
            alignContent="center"
            justifyContent="center"
          >
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Grid2>
  );
};
