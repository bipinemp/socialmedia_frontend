import AddPost from "./components/AddPost";
import Posts from "./components/Posts";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-14">
      <AddPost />
      <Posts />
    </main>
  );
}
