export default async function toolCall(paramOne: string, paramTwo: string, envVar: string): Promise<string> {
    let result = '';

    console.log(`Received event with the following parameters: ${paramOne}, ${paramTwo} and the following env var: ${envVar}.`)

    result = paramOne + paramTwo;

    return result;
}
