import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    if (!this.showUserProfileUseCase.userExists({ user_id })) {
      return response.status(404).send({ error: "User not found" });
    }

    const user = this.showUserProfileUseCase.execute({ user_id });

    return response.status(201).send(user);
  }
}

export { ShowUserProfileController };
