"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signInAction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return { error: error.message };
  }
  redirect("/dashboard");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};
