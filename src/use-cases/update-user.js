import { EmailAlreadyInUseError } from "../errors/user.js";
import bcrypt from "bcrypt";

export class UpdateUserUseCase {
    constructor(
        postgresGetUserByEmailRepository,
        postgresUpdateUserRepository,
    ) {
        (this.postgresGetUserByEmailRepository =
            postgresGetUserByEmailRepository),
            (this.postgresUpdateUserRepository = postgresUpdateUserRepository);
    }
    async execute(userId, updateUserParams) {
        // se o e-mail estiver sendo atualizado, verificar se ele já esta em uso
        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                );

            if (userWithProvidedEmail && userWithProvidedEmail.id != userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email);
            }
        }

        const user = {
            ...updateUserParams,
        };

        // se a senha estiver sendo atualizada, criptografa-la
        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            );

            user.password = hashedPassword;
        }
        // chamar o repository para atualizar o usuario
        const updatedUser = await this.postgresUpdateUserRepository.execute(
            userId,
            user,
        );

        return updatedUser;
    }
}
