import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, email } = request.body;

    const user = this.createUserUseCase.execute({
      name,
      email,
    });

    return response.status(201).send(user);
  }
}

export { CreateUserController };
