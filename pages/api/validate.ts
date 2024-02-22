// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const valid = luhnCheck(req.body.number);

    if (valid) {
        res.status(200).json({ message: 'Number is valid' });
    } else {
        res.status(400).json({ message: 'Number is invalid' });
    }
}

const luhnCheck = (creditCard: string): boolean => {
    const digitsOnly = creditCard.replace(/\D/g, '');

    const digits = digitsOnly.split('').map(Number);

    let sum = 0;

    for (let i = digits.length - 2; i >= 0; i--) {
        //double every other digit
        if (i % 2 == digits.length % 2) {
            const digit = digits[i] * 2;
            sum += Math.floor(digit / 10) + (digit % 10);
        } else {
            sum += Math.floor(digits[i] / 10) + (digits[i] % 10);
        }
    }

    return digits[digits.length - 1] === 10 - (sum % 10);
};
