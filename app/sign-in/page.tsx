import SignIn from "../../components/auth/SignIn";
import AppLayout from "../../components/shared/AppLayout";
import AuthSignInLayout from "../../components/shared/AuthSignInLayout";

const Login = () => {
  return (
    <AppLayout>
      <AuthSignInLayout>
        <SignIn />
      </AuthSignInLayout>
    </AppLayout>
  );
};

export default Login;
