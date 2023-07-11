"use client";

import { useLoginMutation } from "@/app/redux/features/api/apiSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCredentials } from "@/app/redux/features/api/authSlice";

const Page = () => {
  const router = useRouter();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginInfo);
      console.log(res);
      if (res.error) {
        alert(res.error?.data?.message);
      }
      if (res.data.status === 201) {
        setCredentials(res.data);
        setLoginInfo({ email: "", password: "" });

        router.push("/");
      }
    } catch (error) {
      alert(error?.data?.message);
    }
  };

  return (
    <div className="w-96 border-2 border-primary rounded-lg mx-auto flex flex-col gap-5 mt-20 p-5 ">
      <h1 className="h1 text-center border-b border-b-secondary">User Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          value={loginInfo.email}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
          }
          type="email"
          placeholder="email"
          name="email"
          required
          className="border border-text-secondary p-2 outline-1 focus:outline-secondary"
        />
        <input
          value={loginInfo.password}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
          }
          type="password"
          placeholder="password"
          name="password"
          required
          className="border border-text-secondary p-2 outline-1 focus:outline-secondary"
        />
        <button
          type="submit"
          className="bg-primary text-mode-extralight  py-3 rounded-md font-bold tracking-normal focus:outline-secondary"
        >
          {isLoading ? "..." : "Login"}
        </button>
      </form>
      <p>
        Doesn't have Account?&nbsp;{" "}
        <Link href="/register" className="text-secondary underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Page;
