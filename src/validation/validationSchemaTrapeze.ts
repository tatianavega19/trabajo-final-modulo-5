import zod from "zod";

const figureSchema = zod.object({
    name: zod.string(),
    description: zod.string(),
    steps: zod.array(zod.string()),
    difficulty: zod.string(),
    images: zod.object({
        jpg: zod.object({
            image_url: zod.string().url(),
        }),
    }),
});

const validatePartiaTrapeze = (obj: any) => figureSchema.partial().safeParse(obj);

export { validatePartiaTrapeze };