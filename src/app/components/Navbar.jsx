"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useGetProfileQuery,
  useLogoutMutation,
} from "../redux/features/api/apiSlice";
import { useSelector } from "react-redux";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data, error, isLoading } = useGetProfileQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout();
      router.push("/login");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) return null;

  return (
    <div>
      <nav className="bg-secondary  text-mode-extralight flex items-center justify-center py-3 gap-16">
        <h1 className="text-lg font-bold">
          <Link href="/">Social_Media</Link>
        </h1>
        <ul className="flex gap-4">
          <li>
            <Link
              href="/"
              className={`${
                pathname === "/" && "underline underline-offset-4"
              } `}
            >
              Home
            </Link>
          </li>

          <li>{data && data.user.name}</li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
