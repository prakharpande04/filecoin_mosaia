import axios from 'axios';
import BigNumber from 'bignumber.js';

interface FilecoinResponse {
    result: string;  // The balance is returned directly as a string
    error?: {
        message: string;
        code: number;
    };
}

function validateAndFormatAddress(address: string): string {
    // If it's an Ethereum address, return it as is
    if (address.startsWith('0x')) {
        return address.toLowerCase();
    }
    
    // For Filecoin addresses, validate the format
    if (address.startsWith('t') && 
        (address.startsWith('t0') || 
         address.startsWith('t1') || 
         address.startsWith('t2') || 
         address.startsWith('t3') || 
         address.startsWith('t4') ||
         address.startsWith('t410f')) &&
        address.length >= 8) {
        return address;
    }
    
    throw new Error('Invalid address format. Address must be either an Ethereum address (0x...) or a valid Filecoin testnet address (t0, t1, t2, t3, t4, or t410f)');
}

export default async function toolCall(walletAddress: string, apiKey: string): Promise<string> {
    try {
        // Validate and format the address
        const formattedAddress = validateAndFormatAddress(walletAddress);

        // Using Filecoin Calibration testnet API endpoint
        const response = await axios.post(
            'https://calibration.filecoin.chain.love/rpc/v1',
            {
                jsonrpc: '2.0',
                method: 'eth_getBalance',  // Using eth_getBalance for EVM compatibility
                params: [formattedAddress, 'latest'],
                id: 1
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = response.data as FilecoinResponse;
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        // Convert hex result to decimal
        const balanceHex = data.result || '0x0';
        const balanceInAttoFil = new BigNumber(balanceHex);
        const balanceInTFil = balanceInAttoFil.dividedBy(new BigNumber('1e18'));
        
        return JSON.stringify({
            original_address: walletAddress,
            formatted_address: formattedAddress,
            balance: balanceInTFil.toString(),
            unit: 'tFIL',
            network: 'Calibration testnet'
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.error?.message || error.message;
            throw new Error(`Failed to fetch testnet wallet balance: ${errorMessage}`);
        }
        throw error;
    }
}
