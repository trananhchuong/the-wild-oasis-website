import Counter, { UserType } from "@/app/_components/Counter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cabins",
};

export default async function Page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data: UserType[] = await res.json();
  console.log(data);

  return (
    <div>
      <h1>Cabins page</h1>
      <ul>
        {data.map((user: UserType) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <Counter users={data} />
    </div>
  );
}
