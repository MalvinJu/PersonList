export class Person {
    public id: number;
    public name: string;
    public email: string;
    public birthday: Date;
    public occupation: string;

    constructor() {
        this.name = "";
        this.id = 0;
        this.email = "";
        this.birthday = new Date();
        this.occupation = "";
    }
}