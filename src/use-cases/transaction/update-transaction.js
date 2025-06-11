export class UpdateTransactionUseCase {
    constructor(postgresUpdateTransactionRepository) {
        this.postgresUpdateTransactionRepository =
            postgresUpdateTransactionRepository;
    }
    async execute(transactionId, params) {
        // chamar o repository
        const transaction =
            await this.postgresUpdateTransactionRepository.execute(
                transactionId,
                params,
            );

        return transaction;
    }
}
