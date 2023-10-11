import React from "react";
import { SignupComponent } from "../../components/molecules/signupComponent";
import { parseCookies } from "nookies";

export default function Signup() {
  return <SignupComponent />;
}

export const getServerSideProps = (ctx: any) => {
  const { req } = ctx;
  const cookies = parseCookies({ req });
  const token = cookies["token"];
  if (token) {
    ctx?.res?.writeHead(302, { Location: "/" });
    ctx?.res?.end();
  }
  return { props: {} };
};
