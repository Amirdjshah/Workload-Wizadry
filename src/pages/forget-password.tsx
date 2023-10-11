import React from "react";
import { ForgetPasswordComponent } from "../../components";
import { parseCookies } from "nookies";

export default function ForgetPasswordPage() {
  return <ForgetPasswordComponent />;
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
