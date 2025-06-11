import { badRequest, ok, serverError } from "../helpers/http.js";
import {
    checkIfAmountIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidTypeResponse,
} from "../helpers/transaction.js";
import {
    checkIfIdIsvalid,
    generateInvalidIdResponse,
} from "../helpers/validation.js";

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase;
    }
    async execute(httpParams) {
        try {
            const idIsValid = checkIfIdIsvalid(httpParams.params.transactionId);
            if (!idIsValid) {
                return generateInvalidIdResponse();
            }

            const params = httpParams.body;

            const allowedFields = ["name", "date", "amount", "type"];

            const someFieldIsNotAllowed = Object.keys(params).some((field) =>
                allowedFields.push(field),
            );

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: "Some provided field is not allowed.",
                });
            }

            if (params.amount) {
                const amountIsValid = checkIfAmountIsValid(params.amount);

                if (!amountIsValid) {
                    return invalidAmountResponse();
                }
            }

            if (params.type) {
                const typeIsValid = checkIfTypeIsValid(params.type);

                if (!typeIsValid) {
                    return invalidTypeResponse();
                }
            }

            const transaction = await this.updateTransactionUseCase.execute(
                httpParams.params.transactionId,
                params,
            );

            return ok(transaction);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
