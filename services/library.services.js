const {PrismaClient} = require('@prisma/client');

class LibraryServices{
    constructor(){

    }
    
    getUserLibrary(username){
        const prisma = new PrismaClient();
        const user = prisma.users.findUnique({
            where: {
                username: username
            }
        });
        const library = prisma.transaction.findMany({
            where: {
                user_id: user.id,
                include: {
                    games: true
                }
            }
        });

        return library;
    }

}

module.exports = LibraryServices;