// stores/cookiee.js (your Pinia store)
import { defineStore } from "pinia";
import supabase from "~/plugins/supabase";

export const useCookieStore = defineStore("cookiee", () => {
  const userId = useCookie("userIdCookie", { maxAge: 60 * 60 });
  const proyId = useCookie("proyIdCookie", { maxAge: 60 * 60 });
  const tareaId = useCookie("tareaIdCookie", { maxAge: 60 * 60 });
  const user = ref(); // Store for user data

  const setUserId = (data?: string) => (userId.value = data);
  const setProyId = (data?: string) => (proyId.value = data);
  const setTareaId = (data?: string) => (tareaId.value = data);

  const fetchUser = async () => {
    const { data: userData, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user", error);
      return;
    }
    user.value = userData;
  };

  // Add methods for updating password and email
  const changePassword = async (newPassword) => {
    try {
      if (!newPassword) {
        return { error: "New password cannot be empty" };
      }

      const { $supabase } = useNuxtApp();

      // Attempt to update the password
      const { error: updateError } = await $supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        console.error(
          `There was an error updating the password: ${updateError.message}`
        );
        return {
          error: `There was an error updating the password: ${updateError.message}`,
        };
      }

      console.log(`All good`);

      // Return success indicator explicitly
      return { success: true };
    } catch (error) {
      console.error(
        "Unexpected error occurred while updating the password:",
        error
      );
      return { error: "Unexpected error occurred while updating the password" };
    }
  };

  const changeEmail = async (newEmail) => {
    try {
      if (!newEmail) {
        return { error: "New email cannot be empty" };
      }

      const { $supabase } = useNuxtApp();

      // Attempt to update the email
      const { error: changeError } = await $supabase.auth.updateUser({
        email: newEmail,
      });

      if (changeError) {
        console.error(
          `There was an error changing the email: ${changeError.message}`
        );
        return {
          error: `There was an error changing the email: ${changeError.message}`,
        };
      }

      // Return success indicator explicitly
      return { success: true };
    } catch (error) {
      console.error(
        "Unexpected error occurred while changing the email:",
        error
      );
      return { error: "Unexpected error occurred while changing the email" };
    }
  };

  const signin = async (email, password) => {
    try {
      if (!email || !password) {
        return { error: "Empty fields" };
      }

      const { $supabase } = useNuxtApp();

      const { data: signinUser, error: signinError } =
        await $supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

      if (signinError) {
        console.error(`There was an error signing in: ${signinError.message}`);
        return {
          error: `There was an error signing in: ${signinError.message}`,
        };
      }

      const { data: userData, error: userError } = await $supabase
        .from("app_user")
        .select("*")
        .eq("id", signinUser.user.id)
        .single();

      if (userError) {
        return {
          error: `There was an error retrieving the user: ${userError.message}`,
        };
      }

      if (!userData) {
        return { error: "User not found on database" };
      }

      setUserId(userData.username);

      return { success: true };
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  return {
    userId,
    proyId,
    tareaId,
    setUserId,
    setProyId,
    setTareaId,
    fetchUser,
    changePassword,
    changeEmail,
    signin,
  };
});
