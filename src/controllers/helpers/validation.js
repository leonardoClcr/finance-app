import { badRequest } from "../helpers/http.js";
import validator from "validator";

export const checkIfIdIsvalid = (id) => validator.isUUID(id);

export const generateInvalidIdResponse = () =>
    badRequest({
        message: "The provided id is not valid.",
    });

export const checkIfIsString = (value) => typeof value === "string";

export const validateRequiredFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const fieldIsMissing = !params[field];

        const fieldIsEmpty =
            checkIfIsString(params[field]) &&
            validator.isEmpty(params[field], {
                ignore_whitespace: true,
            });
        if (fieldIsMissing || fieldIsEmpty) {
            return {
                missingField: field,
                ok: false,
            };
        }
    }

    return {
        ok: true,
        missingField: undefined,
    };
};
