// import React, { useState } from "react";
// import styles from "./Signup.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import {axiosInstance} from "../lib/Axios";


// import {
//   TextField,
//   Button,
//   Typography,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";

// import { Visibility, VisibilityOff } from "@mui/icons-material";

// import ChatImage from "../assets/ChatImage.png";


// export default function SignupPage() {
//   const [showPass, setShowPass] = useState(false);
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const [signupData, setSignupData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const { mutate, isPending, error } = useMutation({
//     mutationFn: async (data) => {
//       const response = await axiosInstance.post("/auth/signup", data);
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["authUser"] });
//       navigate("/"); // ✅ redirect to Home
//     },

   
//   })


    
     

//   const handleSignup = (e) => {
//     e.preventDefault();
//     mutate(signupData);
//   };


import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";

import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import ChatImage from "../assets/ChatImage.png";

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/auth/signup", data);
      return response.data;
    },

    // 🔵 Loading Toast
    onMutate: () => {
      toast.loading("Creating your account...", { id: "signup" });
    },

    // 🟢 Success Toast
    onSuccess: (data) => {
      toast.success("Account created successfully 🎉", {
        id: "signup",
      });

      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },

    // 🔴 Error Toast
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Signup failed. Please try again.",
        { id: "signup" }
      );
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    mutate(signupData);
  };




  return (
    <div className={styles.container}>
      <div className={styles.cardBox}>

        {/* LEFT: FORM */}
        <div className={styles.leftSide}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Create Account
          </Typography>

          <Typography color="text.secondary" gutterBottom>
            Join us and start your journey!
          </Typography>

          {/* {
            error && ( <div className="alert alert-error mb-4">
              <span className="text-red-500 font-white" >{error.response.data.message}</span>

            </div>)
          } */}

          <form onSubmit={handleSignup}>
            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              value={signupData.fullName}
              onChange={(e) =>
                setSignupData({ ...signupData, fullName: e.target.value })
              }
            />

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            />

            <TextField
              label="Password"
              type={showPass ? "text" : "password"}
              fullWidth
              margin="normal"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)}>
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* {error && (
              <Typography color="error" mt={1}>
                {error.message || "Signup failed"}
              </Typography>
            )} */}

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.4,
                fontSize: "16px",
                borderRadius: "10px",
              }}
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Creating Account..." : "SIGN UP"}
            </Button>
          </form>

          <Typography mt={3} textAlign="center">
            Already have an account?{" "}
            <Link to="/login">
              <span style={{ color: "#1976d2", cursor: "pointer" }}>
                Login
              </span>
            </Link>
          </Typography>
        </div>

        {/* RIGHT: IMAGE */}
        <div
          className={styles.rightSide}
          style={{ backgroundImage: `url(${ChatImage})` }}
        >
          <div className={styles.overlayBox}>
            <Typography variant="h5" fontWeight="bold">
              Welcome!
            </Typography>
            <Typography variant="body2">
              Create your account to begin the journey.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
