"use client";

import { parseCookies } from "nookies";
import { DashboardLayout } from "../../../../../components";
import { WorkloadForm } from "../../../../../components/molecules/workloadForm";
import {
  useSingleWorkload,
} from "../../../../../lib/hooks/workload";
import { NextPage } from "next";

interface IProps {
  token: string;
  id: string;
}

const ViewWorkload: NextPage<IProps> = ({ id, token }) => {
  const { workloadData, workloadLoading, status } = useSingleWorkload(id);
  return (
    <DashboardLayout>
      <WorkloadForm initialValues={workloadData} isEdit={true} view={true} status={status} />
    </DashboardLayout>
  );
};

export const getServerSideProps = (ctx: any) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    ctx?.res?.writeHead(302, { Location: "/login" });
    ctx?.res?.end();
  }
  const id = ctx?.query?.id;
  return { props: {token, id }};
};

export default ViewWorkload;
