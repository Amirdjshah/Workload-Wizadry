"use client";

import { DashboardLayout } from "../../components";

import { parseCookies } from "nookies";
import { VisualizationData } from "../../components/elements/visualization";
import { useEffect, useState } from "react";
import { useWorkload } from "../../lib/hooks/workload";
import { AcademicVisualization } from "../../components/elements/visualization/academic";
import { verify } from "jsonwebtoken";

interface HomeProps {
  token: string;
  roleCode: string;
}

export default function Home({ token, roleCode }: HomeProps) {
  const [isClient, setIsClient] = useState(false);
  const { workloadData, workloadLoading } = useWorkload(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <DashboardLayout>
        {isClient ? (
          <>
            {roleCode !== "AD" ? (
              <VisualizationData workloadData={workloadData} />
            ) : (
              <AcademicVisualization workloadData={workloadData?.[0]} />
            )}
          </>
        ) : (
          <></>
        )}
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = (ctx: any) => {
  const { req } = ctx;
  const cookies = parseCookies({ req });
  const token = cookies["token"];
  if (!token) {
    ctx?.res?.writeHead(302, { Location: "/login" });
    ctx?.res?.end();
  }
  const secretKey = process.env.SECRET_KEY || "secret";
  const decoded: any = verify(token, secretKey);
  return { props: { token, roleCode: decoded?.roleCode } };
};
