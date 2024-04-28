import { Box, Button, Snackbar, TextField, Icon } from "@mui/material";
import { useRef, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { EmailOutlined as EmailOutlinedIcon } from "@mui/icons-material";
import LocationCityIcon from "@mui/icons-material/LocationCity";

export default function Login() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usersRef = collection(db, "users");
  const navigate = useNavigate();
  const [isProgress, setIsProgress] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsProgress(true);
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;
        try {
            const querySnapshot = await getDocs(query(usersRef, where("email", "==", emailValue)));
            if (!querySnapshot.empty) {
                const user = querySnapshot.docs[0].data();
                const userId = querySnapshot.docs[0].id;

                if (user.password === passwordValue) {
                    console.log("Login success");
                    localStorage.setItem('user_logged', JSON.stringify(userId));
                    setIsProgress(false);
                    navigate('/dashboard', { replace: true });
                    return;
                } else {
                    setErrorAlert("Contraseña incorrecta");
                }
            } else {
                setErrorAlert("Usuario no encontrado");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setErrorAlert("Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.");
        }

    setIsProgress(false);
  };

  const handleCloseAlert = () => {
    setErrorAlert(null);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Box
        className=" text-white"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          margin: "45px 90px 10px",
          width: "100%",
          height: "10px",
        }}
      >
        <div>
          <h1>FLAT-CAMALEON</h1>
        </div>
      </Box>

      <div
        className=" flex items-center justify-center bg-transparent"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          margin: "0px auto",
          width: "90%",
          height: "700px",
          backgroundColor: "255, 255, 258, 0.9",
          padding: "5px",
          borderRadius: "10px",
          boxShadow: "0 0px 9px rgba(255 250 240)",
        }}
      >
        <div style={{margin: "60px 30px 0px",
               width: "100%",}}>
          <Icon style={{ fontSize: "50px", color: "white" }}>
            <LocationCityIcon />
          </Icon>
          <h2 className="uppercase"  >
            Welcome to the website
          </h2>
          <p
            style={{
              fontSize: "20px",
              fontFamily: "Verdana, sans-serif",
              color: "snow",
              margin: "10px 450px 0px",
               width: "50%",
              
            }}
          >
            To stay connected whit us please login whit your personal info
          </p>
        </div>

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            p: 2,
            border: "2px solid #ccc",
            borderRadius: "18px",
            maxWidth: "300px",
            backgroundColor: "wite",
            margin: "auto",
            width: "80%",
          }}
        >
          <div className="text-center uppercase">
            <h1 className=" font-bold text-black-400">Login</h1>
          </div>

          <TextField
            label="Email"
            inputRef={emailRef}
            fullWidth
            variant="outlined"
            type="email"
            className="mb-4"
            InputProps={{
              startAdornment: (
                <Icon>
                  <EmailOutlinedIcon />
                </Icon>
              ),
            }}
            sx={{
              border: "2px solid #ccc",
              backgroundColor: "#fafdff",
            }}
          />

          <TextField
            label="Password"
            inputRef={passwordRef}
            fullWidth
            variant="outlined"
            type={showPassword ? "text" : "password"}
            className="mb-4"
            InputProps={{
              startAdornment: (
                <Icon>
                  <LockOutlinedIcon />
                </Icon>
              ),
              endAdornment: (
                <Icon onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </Icon>
              ),
            }}
            sx={{
              border: "2px solid #ccc",
              backgroundColor: "#fafdff",
            }}
          />
          <Button
            type="submit"
            disabled={isProgress}
            fullWidth
            variant="contained"
            className="mb-4"
            style={{ fontWeight: "900" }}
            sx={{
              backgroundColor: "#fafdff",
              color: "#171718",
              border: "2px solid #ccc",
            }}
          >
            {isProgress ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
          <p>
            {" "}
            Don't have an account?
            <a href="/register"> Register </a>
          </p>
        </Box>
        <Snackbar
          open={Boolean(errorAlert)}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          message={errorAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            backgroundColor:
              errorAlert?.severity === "error" ? "#f44336" : "#FF7F50",
          }}
        />
      </div>
    </>
  );
}
