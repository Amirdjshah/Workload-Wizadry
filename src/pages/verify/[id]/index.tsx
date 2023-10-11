import React from "react";
import { VerifyComponent } from "../../../../components";
import { parseCookies } from "nookies";

const Verify: React.FC = () => {
  return <VerifyComponent />;
};

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

export default Verify;
