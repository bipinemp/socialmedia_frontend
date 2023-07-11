"use client";

import { useRegisterMutation } from "@/app/redux/features/api/apiSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
  });

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(registerInfo);
      if (res.error) {
        alert(res.error?.data?.message);
      }
      if (res.data.status === 201) {
        setRegisterInfo({ username: "", email: "", password: "", bio: "" });
        router.push("/login");
      }
    } catch (error) {
      alert(error?.data?.message);
    }
  };

  return (
    <div className="w-96 border-2 border-primary rounded-lg mx-auto flex flex-col gap-5 mt-20 p-5 ">
      <h1 className="h1 text-center border-b border-b-secondary">
        User Register
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          value={registerInfo.username}
          onChange={(e) =>
            setRegisterInfo({
              ...registerInfo,
              [e.target.name]: e.target.value,
            })
          }
          type="text"
          placeholder="username"
          name="username"
          required
          className="border border-text-secondary p-2 outline-1 focus:outline-secondary"
        />
        <input
          value={registerInfo.email}
          onChange={(e) =>
            setRegisterInfo({
              ...registerInfo,
              [e.target.name]: e.target.value,
            })
          }
          type="email"
          placeholder="email"
          name="email"
          required
          className="border border-text-secondary p-2 outline-1 focus:outline-secondary"
        />
        <input
          value={registerInfo.password}
          onChange={(e) =>
            setRegisterInfo({
              ...registerInfo,
              [e.target.name]: e.target.value,
            })
          }
          type="password"
          placeholder="password"
          name="password"
          required
          className="border border-text-secondary p-2 outline-1 focus:outline-secondary"
        />
        <textarea
          value={registerInfo.bio}
          onChange={(e) =>
            setRegisterInfo({
              ...registerInfo,
              [e.target.name]: e.target.value,
            })
          }
          type="text"
          placeholder="bio"
          name="bio"
          required
          className="border border-text-secondary p-2 outline-1 focus:outline-secondary"
        ></textarea>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-mode-extralight  py-3 rounded-md font-bold tracking-normal focus:outline-secondary"
        >
          {isLoading ? "..." : "Register"}
        </button>
      </form>
      <p>
        Already have Account?&nbsp;{" "}
        <Link href="/login" className="text-secondary underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Page;
