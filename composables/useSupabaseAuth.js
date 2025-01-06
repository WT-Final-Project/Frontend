// composables/useAuth.js
import supabase from "~/plugins/supabase";

export const useAuth = () => {
  // Change Password Method
  const changePassword = async (newPassword) => {
    const { user, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error("Error updating password:", error.message);
      return { error: error.message };
    }

    return { user };
  };

  // Change Email Method
  const changeEmail = async (newEmail) => {
    const { user, error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      console.error("Error updating email:", error.message);
      return { error: error.message };
    }

    return { user };
  };

  return { changePassword, changeEmail };
};
