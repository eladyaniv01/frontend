export default class Interface {
    constructor(...args) {
        this.fields = args;
    }

    implementedBy(cls) {
        for (let arg of this.fields) {
            if (!cls[arg]) {
                throw new Error(
                    `Class ${cls.constructor.name} does not implement method "${arg}"`
                );
            }
        }
    }
}