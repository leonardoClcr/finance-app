import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { badRequest, ok, serverError } from "./helpers.js";
import validator from "validator";
import { EmailAlreadyInUseError } from "../errors/user.js";

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isIdValid = validator.isUUID(userId);

            if (!isIdValid) {
                return badRequest({
                    message: "The provided ID is not valid.",
                });
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
                const passwordIsValid = updateParams.password.length < 6;

                if (passwordIsValid) {
                    return badRequest({
                        message: "Password must be ate least 6 characters.",
                    });
                }
            }

            if (updateParams.email) {
                const emailIsValid = validator.isEmail(updateParams.email);

                if (!emailIsValid) {
                    return badRequest({
                        message: "Invalid e-mail. Please provide a valid one.",
                    });
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();

            const updatedUser = await updateUserUseCase.execute(
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
