import toolCall from "./tool-call";

type RawEvent = {
    body: string;
}

type ParsedEvent = {
    args: {
        wallet_address: string;
    };
    secrets: {
        FILECOIN_TESTNET_API_KEY: string;
    }
}

export async function handler(event: RawEvent) {
    const {
        args: {
            wallet_address,
        },
        secrets: {
            FILECOIN_TESTNET_API_KEY
        }
    } = JSON.parse(event.body) as ParsedEvent;

    try {
        const result = await toolCall(wallet_address, FILECOIN_TESTNET_API_KEY);

        return {
            statusCode: 200,
            body: result,
        };
    } catch (error: unknown) {
        let message = '';

        if (error instanceof Error) {
            message = error.message;
        } else {
            message = 'Unknown error';
        }

        return {
            statusCode: 500,
            body: JSON.stringify({ error: message }),
        };
    }
}
