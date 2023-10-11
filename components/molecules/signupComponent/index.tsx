import React from "react";
import { LoginWrapper } from "../../elements";
import { SignupForm } from "../../elements/signupForm";

const SignupComponent: React.FC = () => {
  return (
    <LoginWrapper>
      <SignupForm />
    </LoginWrapper>
  );
};

export { SignupComponent };
