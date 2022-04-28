import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    if (this.userAlreadyExists(email)) {
      throw new Error("User already exists");
    }

    return this.usersRepository.create({ name, email });
  }

  userAlreadyExists(email: string): boolean {
    const userAlreadyExists = this.usersRepository.findByEmail(email);

    return !!userAlreadyExists;
  }
}

export { CreateUserUseCase };
