import bcrypt from 'bcryptjs';

export const hashPassword = async (password: any) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        console.error(error)
    }
}

export const comparePassword = async (password: any, hash: any) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error(error)
    }
}