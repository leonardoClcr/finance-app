import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresUpdateTransactionRepository {
    async execute(userId, updateTransactionsParams) {
        const updateFields = [];
        const updateValues = [];

        Object.keys(updateTransactionsParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`);
            updateValues.push(updateTransactionsParams[key]);
        });

        updateValues.push(userId);

        const updateQuery = `
        UPDATE transactions
        SET ${updateFields.join(", ")}
        WHERE id = $${updateValues.length}
        RETURNING *
        `;

        const updateTransaction = await PostgresHelper.query(
            updateQuery,
            updateValues,
        );

        return updateTransaction[0];
    }
}
