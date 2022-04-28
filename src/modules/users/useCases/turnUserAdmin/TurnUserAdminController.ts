import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    const turnedUser = this.turnUserAdminUseCase.execute({ user_id });

    return response.status(201).send(turnedUser);
  }
}

export { TurnUserAdminController };
