import { Navbar } from "@/components/share/navbar";
import { getMe } from "@/services/getMe";

const DashboardGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMe();
  return (
    <div>
      <Navbar user={user} />
      {children}
    </div>
  );
};

export default DashboardGroupLayout;
