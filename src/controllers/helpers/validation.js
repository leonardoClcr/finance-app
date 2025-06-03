import { badRequest } from "../helpers/http.js";
import validator from "validator";

export const checkIfIdIsvalid = (id) => validator.isUUID(id);

export const generateInvalidIdResponse = () => {
    badRequest({
        message: "The provided id is not valid.",
    });
};
