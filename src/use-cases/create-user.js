import { v4 as uuidv4 } from "uuid";
import bycript from "bcrypt";
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js";

export class CreateUserUseCase {
    async execute(createUserParams) {
        // gerar ID do usuario
        const userId = uuidv4();

        // criptografar a senha
        const hashedPassword = await bycript.hash(
            createUserParams.password,
            10,
        );

        // Inserir o usuario no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        // chamar o repositorio
        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        return await postgresCreateUserRepository.execute(user);
    }
}
