export class User {
    constructor(
        public displayName: string,
        public localId: string, 
        public email: string, 
        public firstName: string, 
        public lastName: string, 
        public emailVerified?: string,
        public lastLoginAt?: string,
        public createdAt?: string,
        ) {
    }
}