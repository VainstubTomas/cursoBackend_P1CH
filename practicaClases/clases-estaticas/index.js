import crypto from "crypto";

const secretKey = "miClaveSecreta";

class UsersManager{
    static users = [];

    static hashPassword = (password) => {
        const hashedPassword = crypto.createHmac("sha256", secretKey).update(password).digest("hex");
        return hashedPassword;
    }

    static createUser = (user) => {
        const hashedPassword = this.hashPassword(user.password);
        const newUser = {...user, password:hashedPassword};
        this.users.push(newUser);
        return "usuario creado correctamente";
    }

    static showUsers = () => {
        return this.users;
    }

    static login = (username, password) => {
        const userFind = this.users.find( (user) => user.username === username );
        if (!userFind) return "usuario no encontrado";

        const hashedPassword = this.hashPassword(password);
        if(userFind.password !== hashedPassword) return "contraseña incorrecta";

        return "logueado correctamente";
    }
}

UsersManager.createUser({username:"Tomas", password:"miClaveSecreta0904"});
console.table(UsersManager.showUsers());
console.log(UsersManager.login("Tomas", "miClaveSecreta0904"));