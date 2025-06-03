import validator from "validator";
import { generateInvalidIdResponse } from "../helpers/validation.js";
import { notFound, ok, serverError } from "../helpers/http.js";

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const idIsValid = validator.isUUID(userId);

            if (!idIsValid) {
                return generateInvalidIdResponse();
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId);

            if (!deletedUser) {
                return notFound({
                    message: "User not found",
                });
            }

            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
