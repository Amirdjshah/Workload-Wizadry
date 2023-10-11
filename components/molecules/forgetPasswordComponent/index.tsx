import React from "react";
import { LoginWrapper } from "../../elements";
import { ForgetPasswordForm } from "../../elements/forgetPasswordForm";

const ForgetPasswordComponent: React.FC = () => {
  return (
    <LoginWrapper>
      <ForgetPasswordForm />
    </LoginWrapper>
  );
};

export { ForgetPasswordComponent };
