import { v4 as uuidv4 } from "uuid";
import bycript from "bcrypt";
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user";

export class CreateUserUseCase {
    async execute(createUserParams) {
        const userId = uuidv4();

        const hashedPassword = await bycript.hash(
            createUserParams.password,
            10,
        );

        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        return await postgresCreateUserRepository.execute(user);
    }
}
