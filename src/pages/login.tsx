import React from "react";
import { LoginComponent } from "../../components/molecules";
import { parseCookies } from "nookies";

export default function Login() {
  return <LoginComponent />;
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
