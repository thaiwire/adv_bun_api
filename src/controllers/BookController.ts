
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export const BookController = {
    create: async ({ body }: {
        body: {
            name: string;        
            price : number;
        }        
    }) => {
           try {
            const book = await prisma.book.create({
                data : {
                    name: body.name,
                    price: body.price
                }
            });
           } catch (error) {
             console.log(error);
             return { error: "Error creating book" };
           } 
    }


}

