import { badRequest } from "../helpers/http.js";
import validator from "validator";

export const generateInvalidPasswordResponse = () => {
    return badRequest({
        message: "Password must be at least 6 characters.",
    });
};

export const generateEmailAlreadyInUseResponse = () => {
    return badRequest({
        message: "Invalid e-mail. Please provide a valid one.",
    });
};

export const generateInvalidIdResponse = () => {
    badRequest({
        message: "The provided id is not valid.",
    });
};

export const checkIfPasswordIsValid = (password) => password.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);
