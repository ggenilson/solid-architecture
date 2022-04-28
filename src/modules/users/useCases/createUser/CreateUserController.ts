import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, email } = request.body;

    if (this.createUserUseCase.userAlreadyExists(email)) {
      return response.status(400).send({ error: "User already exists" });
    }

    const user = this.createUserUseCase.execute({
      name,
      email,
    });

    return response.status(201).send(user);
  }
}

export { CreateUserController };
