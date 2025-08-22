import { authClient } from "../lib/auth-client";

export const useAuth = () => {
  const { data, isPending } = authClient.useSession();

  const handleLogin = (email: string, password: string) => {
    return authClient.signIn.email({
      email,
      password,
    });
  };

  const handleSignUp = (email: string, password: string, name: string) => {
    return authClient.signUp.email({
      email,
      password,
      name,
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/sign-in",
      });
    } catch (er) {
      console.error(er);
    }
  };

  return {
    session: data,
    isPending,
    signOut: authClient.signOut,
    handleGoogleSignIn,
    handleLogin,
    handleSignUp,
    verifyEmail: () =>
      authClient.emailOtp.sendVerificationOtp({
        email: data?.user.email as string,
        type: "email-verification",
      }),
  };
};
