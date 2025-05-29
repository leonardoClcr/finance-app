import { badRequest, created, serverError } from "./helpers/http.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    generateEmailAlreadyInUseResponse,
    generateInvalidPasswordResponse,
} from "./helpers/user.js";
export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            // validar a requisição (campos obrigatorios, tamanhos de senha e email)
            const requiredFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}` });
                }
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password);

            if (!passwordIsValid) {
                return generateInvalidPasswordResponse();
            }

            const emailIsvalid = checkIfEmailIsValid(params.email);

            if (!emailIsvalid) {
                return generateEmailAlreadyInUseResponse();
            }

            // chamar o use case

            const createdUser = await this.createUserUseCase.execute(params);

            // retornar a resposta para o usuario (status code)
            return created(createdUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.error(error);
            return serverError();
        }
    }
}
