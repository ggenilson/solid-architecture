import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const user_id = request.headers.user_id as string;

    if (!this.listAllUsersUseCase.userExists({ user_id })) {
      return response.status(400).send({ error: "User not found" });
    }

    if (!this.listAllUsersUseCase.isAdmin({ user_id })) {
      return response.status(400).send({ error: "User is not admin" });
    }

    const allUsers = this.listAllUsersUseCase.execute({ user_id });

    return response.status(201).send(allUsers);
  }
}

export { ListAllUsersController };
