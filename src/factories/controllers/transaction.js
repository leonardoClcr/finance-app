import { PostgresCreateTransactionRepository } from "../../repositories/postgres/transaction/create-transaction.js";
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id.js";
import { CreateTransactionUseCase } from "../../use-cases/transaction/create-transaction.js";
import { CreateTransactionController } from "../../controllers/transaction/create-transaction.js";

export const makeCreateTransactionController = () => {
    const postgresCreateTransactionRepository =
        new PostgresCreateTransactionRepository();

    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

    const createTransactionUseCase = new CreateTransactionUseCase(
        postgresCreateTransactionRepository,
        postgresGetUserByIdRepository,
    );

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    );

    return createTransactionController;
};
