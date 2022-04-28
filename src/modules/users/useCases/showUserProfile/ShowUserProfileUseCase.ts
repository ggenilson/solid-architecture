import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);

    if (!this.userExists({ user_id })) {
      throw new Error("User does not exist");
    }

    return user;
  }

  userExists({ user_id }: IRequest): boolean {
    const user = this.usersRepository.findById(user_id);

    return !!user;
  }
}

export { ShowUserProfileUseCase };
