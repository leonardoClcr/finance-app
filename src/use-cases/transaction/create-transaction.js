import { v4 as uuidv4 } from "uuid";
import { UserNotFoundError } from "../../errors/user.js";

export class CreateTransactionUseCase {
    constructor(
        postgresCreateTransactionRepository,
        postgresGetUserByIdRepository,
    ) {
        (this.postgresCreateTransactionRepository =
            postgresCreateTransactionRepository),
            (this.postgresGetUserByIdRepository =
                postgresGetUserByIdRepository);
    }
    async execute(createTransactionParams) {
        // validar se o usuario existe
        const user_id = createTransactionParams.user_id;

        const user = await this.postgresGetUserByIdRepository.execute(user_id);

        if (!user) {
            throw new UserNotFoundError(user_id);
        }

        const transactionId = uuidv4();

        const transaction =
            await this.postgresCreateTransactionRepository.execute({
                ...createTransactionParams,
                id: transactionId,
            });

        return transaction;
    }
}
