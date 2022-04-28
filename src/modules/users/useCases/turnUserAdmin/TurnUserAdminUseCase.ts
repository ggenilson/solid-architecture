import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    if (!this.userExists({ user_id })) {
      throw new Error("User does not exists");
    }

    const user = this.usersRepository.findById(user_id);

    return this.usersRepository.turnAdmin(user);
  }

  userExists({ user_id }: IRequest): boolean {
    const user = this.usersRepository.findById(user_id);

    return !!user;
  }
}

export { TurnUserAdminUseCase };
