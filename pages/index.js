import HomeStats from "@/components/HomeStats";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  return (
    <Layout>
      <div>Hello&#44; {session?.user?.name}&#128521;</div>
      <HomeStats />
    </Layout>
  )
}
