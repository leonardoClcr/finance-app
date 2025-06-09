import { UserNotFoundError } from "../../errors/user";
import { ok, serverError } from "../helpers/http.js";
import { userNotFoundResponse } from "../helpers/user.js";
import {
    checkIfIdIsvalid,
    generateInvalidIdResponse,
    requiredFieldIsMissingResponse,
} from "../helpers/validation.js";

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId;
            //verificar se o userId foi passado como parametro
            if (!userId) {
                return requiredFieldIsMissingResponse("userId");
            }
            //verificar se o userId é um ID válido
            const userIsIsValid = checkIfIdIsvalid(userId);

            if (!userIsIsValid) {
                return generateInvalidIdResponse();
            }

            //chamar o userCase e reposta http
            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                });

            return ok(transactions);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }
            console.error(error);
            return serverError();
        }
    }
}
