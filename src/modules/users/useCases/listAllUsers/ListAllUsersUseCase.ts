import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    if (!this.userExists({ user_id })) {
      throw new Error("User does not exist");
    }

    if (!this.isAdmin({ user_id })) {
      throw new Error("User has not permission to view users");
    }

    return this.usersRepository.list();
  }

  userExists({ user_id }: IRequest): boolean {
    const user = this.usersRepository.findById(user_id);

    return !!user;
  }

  isAdmin({ user_id }: IRequest): boolean {
    if (!this.userExists({ user_id })) {
      throw new Error("User not found");
    }

    const user = this.usersRepository.findById(user_id);

    return !!user.admin;
  }
}

export { ListAllUsersUseCase };
