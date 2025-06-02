import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id.js";
import { GetUserByIdController } from "../../controllers/user/get-user-by-id.js";
import { GetUserByIdUseCase } from "../../use-cases/user/get-user-by-id.js";
import { PostgresCreateUserRepository } from "../../repositories/postgres/user/create-user.js";
import { PostgresGetUserByEmailRepository } from "../../repositories/postgres/user/get-user-by-email.js";
import { CreateUserUseCase } from "../../use-cases/user/create-user.js";
import { CreateUserController } from "../../controllers/user/create-user.js";
import { PostgresUpdateUserRepository } from "../../repositories/postgres/user/update-user.js";
import { UpdateUserUseCase } from "../../use-cases/user/update-user.js";
import { UpdateUserController } from "../../controllers/user/update-user.js";
import { PostgresDeleteUserRepository } from "../../repositories/postgres/user/delete-user.js";
import { DeleteUserUseCase } from "../../use-cases/user/delete-user.js";
import { DeleteUserController } from "../../controllers/user/delete-user.js";

export const makeGetUserByIdController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgresGetUserByIdRepository,
    );

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    return getUserByIdController;
};

export const makeCreateUserController = () => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository();
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();

    const createUserUseCase = new CreateUserUseCase(
        postgresGetUserByEmailRepository,
        postgresCreateUserRepository,
    );

    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};

export const makeUpdateUserController = () => {
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();

    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

    const updateUserUseCase = new UpdateUserUseCase(
        postgresGetUserByEmailRepository,
        postgresUpdateUserRepository,
    );

    const updateUserController = new UpdateUserController(updateUserUseCase);

    return updateUserController;
};

export const makeDeleteUserController = () => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
    );
    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    return deleteUserController;
};
