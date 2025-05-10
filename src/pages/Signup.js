import React from "react";
import { Container } from "@mui/material";
import SignupForm from "../components/auth/SignupForm";

const Signup = () => {
  return (
    <Container maxWidth="sm">
      <SignupForm />
    </Container>
  );
};

export default Signup;
