"use client";

import { useState } from "react";
interface UserType {
  id: number;
  name: string;
  email: string;
}
export default function Counter({ users }: { users: UserType[] }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}
export type { UserType };
