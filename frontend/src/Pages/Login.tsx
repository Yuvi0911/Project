/* eslint-disable @typescript-eslint/no-unused-vars */
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import { FormEvent, useState } from "react"
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import toast from "react-hot-toast";
import { usernameValidator } from "../utils/validator";
import axios from "axios";

// const isLogin = false;
const Login = () => {
    const [isLogin] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    const avatar = useFileHandler("single");

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const email = useInputValidation("");
    const username = useInputValidation("",usernameValidator);
    const password = useStrongPassword();

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const toastId = toast.loading("Signing Up...");
        // setIsLoading(true);
        const formData = new FormData();
        formData.append("avatar", avatar.file!);
        formData.append("name", name.value);
        formData.append("email", email.value);
        formData.append("bio", bio.value);
        formData.append("username", username.value);
        formData.append("password", password.value);

        const config = {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
        try{
          const {data} = await axios.post("http://localhost:5000/api/v1/user/new", formData, config);
          console.log(data);
          toast.success(data.message, {
            id: toastId,
          })
        } catch(error){
          // toast.error(error?.response?.data?.message || "Something went wrong",{
          //   id: toastId
          // })
          console.log(error)
        }

    }
  return (
    <div style={{
        backgroundImage: "linear-gradient(#79a0c1, #42668e",
    }}>
      <Container component={"main"} maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Paper
            elevation={3}
            sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                {isLogin ? (
                    <>

                    </>
                ) : (
                  <>
                  <Typography variant="h5">Sign Up</Typography>
                  <form 
                    style={{
                      width: "100%",
                      marginTop: "1rem",
                    }}
                    onSubmit={handleSignUp}
                    >
                      <Stack 
                        position={"relative"} 
                        width={"10rem"}
                        margin={"auto"}>
                          <Avatar sx={{
                            width: "10rem",
                            height: "10rem",
                            objectFit: "contain",
                          }}
                          src={avatar.preview!}
                           />
                         
                          <IconButton 
                            sx={{
                              position: "absolute",
                              bottom: "0",
                              right: "0",
                              color: "white",
                              bgcolor: "rgba(0,0,0,0.5)",
                              ":hover":{
                                bgcolor: "rgba(0,0,0,0.7)",
                              }
                            }}
                              component="label"
                            >
                            <>
                              <CameraAltIcon/>
                              <VisuallyHiddenInput type="file" onChange={avatar.changeHandler}
                              />
                            </>
                          </IconButton>
                        </Stack>
                        {
                      //photo me kuch error hoga toh show krega ye code
                        avatar.error && (
                          <Typography m={"1rem auto"}
                          width={"fit-content"}
                          display={"block"}
                          color="error" variant="caption">
                            {avatar.error}
                          </Typography>
                        )
                      }
                    <TextField
                      required
                      fullWidth
                      label="Name"
                      margin="normal"
                      variant="outlined"
                      value={name.value}
                      onChange={name.changeHandler}
                    />
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      margin="normal"
                      variant="outlined"
                      value={email.value}
                      onChange={email.changeHandler}
                    />
                    <TextField
                      required
                      fullWidth
                      label="Bio"
                      margin="normal"
                      variant="outlined"
                      value={bio.value}
                      onChange={bio.changeHandler}
                    />
                    <TextField
                      required
                      fullWidth
                      label="Username"
                      margin="normal"
                      variant="outlined"
                      value={username.value}
                      onChange={username.changeHandler}
                    />
                    {
                      //iski help se hum error show krege yadi username me kuch glti hogi toh, jo ki hum validators.js file me check krege
                      username.error && (
                        <Typography color="error" variant="caption">
                          {username.error}
                        </Typography>
                      )
                    }
                    <TextField
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      value={password.value}
                      onChange={password.changeHandler}
                    />
                    {
                      //strong password nhi hoga toh error show krega ye code
                        password.error && (
                          <Typography color="error" variant="caption">
                            {password.error}
                          </Typography>
                        )
                      }

                      <Button
                          sx={{
                            marginTop: "1rem",
                           }}
                           variant="contained" color="primary" type="submit" 
                           fullWidth
                          //  disabled={isLoading}
                           >
                            SIGN UP
                           </Button>
          
                           {/* <Typography textAlign={"center"} m={"1rem"}>OR</Typography> */}
          
                           {/* <Button
                            disabled={isLoading}
                            fullWidth
                            variant="text" 
                            onClick={toggleLogin}
                           >
                            LOGIN IN
                            </Button> */}
                   
                  </form>
                </>
                )}
        </Paper>
      </Container>
    </div>
  )
}

export default Login
