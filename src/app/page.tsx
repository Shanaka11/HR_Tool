import SignOut from "./(components)/SignOut";
import Username from "./(components)/Username";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default async function Home() {
  return (
    <div className="h-full w-full grid place-items-center">
      <div>
        <h1 className="text-5xl font-semibold ">
          Hi, <Username />
        </h1>
        <h1 className="text-5xl font-semibold">Welcome to</h1>
        <h2 className="text-7xl font-extrabold leading-loose">HR Tool</h2>
        <SignOut />
      </div>
    </div>
  );
}
