import Footer from "@/components/share/Footer";
import { Navbar } from "@/components/share/Navbar";
import { getMe } from "@/services/getMe";

const PublicGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMe();

  return (
    <div>
      <Navbar user={user} />
      {children}
      <Footer />
    </div>
  );
};

export default PublicGroupLayout;
