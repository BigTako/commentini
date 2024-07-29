"use client";

import { redirect, useParams } from "next/navigation";
import { STORAGE_KEYS } from "~/keys";

export default function AuthTokenPage() {
  const { token } = useParams<{ token: string }>();

  console.log({ token });
  localStorage?.setItem(STORAGE_KEYS.TOKEN, token);

  redirect(`/`);
}
