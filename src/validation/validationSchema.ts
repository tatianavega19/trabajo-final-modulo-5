import zod from "zod";

const registrationSchema: any = zod.object({
    username: zod.string(),
    password: zod.string().min(4).max(10),
    email: zod.string(),
    phoneNumber: zod.number(),
});

const validateUserRegistration = (userData: any) => {
    const validationResult = registrationSchema.safeParse(userData);
    return validationResult;
};

export { validateUserRegistration }