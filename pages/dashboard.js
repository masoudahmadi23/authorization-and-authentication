import { redirect } from "next/dist/server/api-utils";
import { verifyToken } from "../utils/auth";

function Dashboard() {
  return <div>Dashboard</div>;
}

export default Dashboard;

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const secretkey = process.env.SECRET_KEY;

  const result = verifyToken(token, secretkey);

  if (!result) {
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  }

  return { props: { result } };
}
