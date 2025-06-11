import { PostgresCreateTransactionRepository } from "../../repositories/postgres/transaction/create-transaction.js";
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id.js";
import { CreateTransactionUseCase } from "../../use-cases/transaction/create-transaction.js";
import { CreateTransactionController } from "../../controllers/transaction/create-transaction.js";
import { PostgresGetTransactionsByUserIdRepository } from "../../repositories/postgres/transaction/get-transactions-by-user-id.js";
import { GetTransactionsByUserIdUseCase } from "../../use-cases/transaction/get-transactions-by-user-id.js";
import { GetTransactionsByUserIdController } from "../../controllers/transaction/get-transactions-by-user-id.js";
import { UpdateTransactionUseCase } from "../../use-cases/transaction/update-transaction.js";
import { UpdateTransactionController } from "../../controllers/transaction/update-transaction.js";
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

export const makeGetTransactionsByUserIdController = () => {
    const postgresGetTransactionsByUserIdRepository =
        new PostgresGetTransactionsByUserIdRepository();
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

    const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
        postgresGetUserByIdRepository,
        postgresGetTransactionsByUserIdRepository,
    );

    const getTransactionsByUserIdController =
        new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase);

    return getTransactionsByUserIdController;
};

export const makeUpdateTransactionController = () => {
    const postgresUpdateTransactionRepository =
        new postgresUpdateTransactionRepository();
    const updateTransactionUseCase = new UpdateTransactionUseCase(
        postgresUpdateTransactionRepository,
    );
    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    );

    return updateTransactionController;
};
