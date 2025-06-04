import { UserNotFoundError } from "../errors/user.js";

export class GetTransactionsByUserIdUseCase {
    constructor(
        postgresGetUserByIdRepository,
        postgresGetTransactionsByUserIdRepository,
    ) {
        (this.postgresGetUserByIdRepository = postgresGetUserByIdRepository),
            (this.postgresGetTransactionsByUserIdRepository =
                postgresGetTransactionsByUserIdRepository);
    }
    async execute(params) {
        //validar se o usuario existe
        const user = await this.postgresGetUserByIdRepository.execute(
            params.userId,
        );

        if (!user) {
            throw new UserNotFoundError(params.userId);
        }
        //chamar o repository
        const transactions =
            await this.postgresGetTransactionsByUserIdRepository.execute(
                params.userId,
            );

        return transactions;
    }
}
