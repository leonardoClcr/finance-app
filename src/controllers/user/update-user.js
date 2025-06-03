import { badRequest, ok, serverError } from "../helpers/http.js";
import validator from "validator";
import { EmailAlreadyInUseError } from "../../errors/user.js";
import {
    generateEmailAlreadyInUseResponse,
    generateInvalidPasswordResponse,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
} from "../helpers/user.js";
import { generateInvalidIdResponse } from "../helpers/validation.js";
export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isIdValid = validator.isUUID(userId);

            if (!isIdValid) {
                return generateInvalidIdResponse();
            }

            const updateParams = httpRequest.body;

            const allowedFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];

            const someFieldIsNotAllowed = Object.keys(updateParams).some(
                (field) => !allowedFields.includes(field),
            );

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: "Some provided field is not allowed.",
                });
            }

            if (updateParams.password) {
                const passwordIsValid = checkIfPasswordIsValid(
                    updateParams.password,
                );

                if (!passwordIsValid) {
                    return generateInvalidPasswordResponse();
                }
            }

            if (updateParams.email) {
                const emailIsValid = checkIfEmailIsValid(updateParams.email);

                if (!emailIsValid) {
                    return generateEmailAlreadyInUseResponse();
                }
            }

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                updateParams,
            );

            return ok(updatedUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({
                    message: error.message,
                });
            }
            console.error(error);
            return serverError();
        }
    }
}
