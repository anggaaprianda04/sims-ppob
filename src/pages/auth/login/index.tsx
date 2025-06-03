import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import Login from "@/components/views/Auth/Login/Login";

const LoginPage = () => {
  return (
    <AuthLayout title="SIMS PPOB | Login">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
