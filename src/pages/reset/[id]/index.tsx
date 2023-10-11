"use client";

import React from "react";
import { ResetPasswordComponent } from "../../../../components";
import { parseCookies } from "nookies";

export default function ResetPassword() {
  return <ResetPasswordComponent />;
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
