import validator from "validator";
import { generateInvalidIdResponse } from "./helpers/user";
import { DeleteUserUseCase } from "../use-cases/delete-user.js";
import { ok, serverError } from "./helpers/http";

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const idIsValid = validator.isUUID(userId);

            if (!idIsValid) {
                return generateInvalidIdResponse();
            }

            const deleteUserUseCase = new DeleteUserUseCase();

            const deletedUser = await deleteUserUseCase.execute(userId);

            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
