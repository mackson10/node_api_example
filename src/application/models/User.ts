import fetchUsers from "../queries/fetchUsers";
import { Result } from "../../utils/types";

export default class User {
  public id: number;
  public username: string;
  private password: string;
  public isAdmin: boolean;

  static async findByUsername(
    username: string
  ): Promise<Result<User | undefined>> {
    const fetchResult = await fetchUsers({ username });

    if (fetchResult.error) {
      return fetchResult;
    }

    const [fetchedUser] = fetchResult.data;

    const user = new User(
      fetchedUser.id,
      fetchedUser.username,
      fetchedUser.password,
      fetchedUser.isAdmin
    );

    return { data: user };
  }

  static async findById(id: number): Promise<Result<User | undefined>> {
    const fetchResult = await fetchUsers({ id });

    if (fetchResult.error) {
      return fetchResult;
    }

    const [fetchedUser] = fetchResult.data;

    const user = new User(
      fetchedUser.id,
      fetchedUser.username,
      fetchedUser.password,
      fetchedUser.isAdmin
    );

    return { data: user };
  }

  constructor(
    id: number,
    username: string,
    password: string,
    isAdmin: boolean
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
  }

  authenticate(password: string): boolean {
    return this.password === password;
  }
}
