import React, { useState } from "react";
import {
  Input,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { LOGIN } from "src/graphql/authentication";
import { Authentication, UserInfoAuthentication } from "src/types";
import { useNavigate } from "react-router-dom";
import { APP_PATH } from "@utils";
import { useForm } from "react-hook-form";

export const Login: React.FC = () => {
  const [rememberPassword, setRememberPassword] = useState(true);

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
    <Grid
      container
      padding={1}
      spacing={1}
      direction="column"
      alignContent="center"
      justifyContent="center"
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        background: "linear-gradient(45deg, skyblue, transparent)",
      }}
    >
      <Grid item alignContent="center" justifyContent="center">
        <Card style={{ borderRadius: 10, padding: 20 }}>
          <CardHeader
            title="Login"
            sx={{
              textAlign: "center",
              ".MuiCardHeader-title": { fontSize: 30, margin: 1 },
              ".MuiCardHeader-subheader": { fontSize: 18 },
            }}
            subheader="Task Management System"
          />
          <CardContent>
            <form onSubmit={handleSubmit(handleLogin)}>
              <Grid item container direction="column">
                <Grid item>
                  <Input
                    placeholder="Username"
                    {...register("username", { required: true })}
                    style={{ fontSize: 14, width: "-webkit-fill-available" }}
                  />
                </Grid>
                {errors.username && (
                  <Grid item color="red">
                    Username is required
                  </Grid>
                )}
                <Grid item sx={{ marginTop: 2, marginBottom: 2, padding: 0 }}>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...register("password", { required: true })}
                    style={{ fontSize: 14, width: "-webkit-fill-available" }}
                  />
                </Grid>
                {errors.password && (
                  <Grid item color="red">
                    Password is required
                  </Grid>
                )}
                <Grid item alignContent="center" justifyContent="center">
                  <FormControlLabel
                    control={<Typography />}
                    label="Forgot password ?"
                    sx={{
                      userSelect: "none",
                      color: "blue",
                      float: "right",
                      margin: 0,
                      ".MuiTypography-root": {
                        fontSize: 12,
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    checked={rememberPassword}
                    control={<Checkbox />}
                    label="Remeber password"
                    labelPlacement="end"
                    sx={{
                      userSelect: "none",
                      ".MuiTypography-root": {
                        fontSize: 14,
                        justifySelf: "center",
                      },
                    }}
                    onChange={() => setRememberPassword(!rememberPassword)}
                  />
                </Grid>

                <Grid item textAlign="center" sx={{ marginTop: 5 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ fontSize: 12 }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
