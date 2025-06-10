import { UserNotFoundError } from "../../errors/user.js";

export class UpdateTransactionUseCase {
    constructor(
        postgresUpdateTransactionRepository,
        postgresGetUserByIdRepository,
    ) {
        (this.postgresUpdateTransactionRepository =
            postgresUpdateTransactionRepository),
            (this.postgresGetUserByIdRepository =
                postgresGetUserByIdRepository);
    }

    async execute(params) {
        //validar se o usuario existe
        const user = await this.postgresGetUserByIdRepository.execute(
            params.userId,
        );

        if (!user) {
            throw new UserNotFoundError();
        }
        // chamar o repository
        const transaction =
            await this.postgresUpdateTransactionRepository.execute(params);

        return transaction;
    }
}
