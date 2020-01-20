import { Result } from "../../utils/types";

export default async function fetchUsers(
  params: Partial<FetchedUser>
): Promise<Result<FetchedUser[]>> {
  return {
    data: dummyUsers.filter(u =>
      Object.entries(params).every(
        ([key, value]) => u[key as keyof FetchedUser] === value
      )
    )
  };
}

interface FetchedUser {
  id: number;
  username: string;
  password: string;
  isAdmin: boolean;
}

const dummyUsers = [
  { id: 1, username: "john", password: "123", isAdmin: false },
  { id: 2, username: "peter", password: "123", isAdmin: true }
];
