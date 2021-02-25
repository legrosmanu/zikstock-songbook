export class ZikStockErrorDAO {

    messages: Map<string, string>;

    constructor() { // For now, the messages are here before being the database
        this.messages = new Map();
        this.messages.set("400-1", "ZikResource validation failed: must have at least a title and a url.");
        this.messages.set("400-2", "ZikResource validation failed: can't have more than 10 tags.");
        this.messages.set("400-3", "The password doesn't respect the security rules.");
        this.messages.set("400-4", "The email seems not valid.");
        this.messages.set("400-5", "You are not the owner of the resource you want to update or delete.");
        
        this.messages.set("401-1", "The user has not been retrieved with the information from the JWT.");

        this.messages.set("404-1", "The ZikResource doesn't exist.");
        this.messages.set("409-1", "The User can't be created because this email has been already used by a User.");
        
        this.messages.set("500-2", "Error during the insertion into the database.");
        this.messages.set("500-3", "Error during the update of the zikresource.");
        this.messages.set("500-4", "The zikresource has not been deleted.");
        this.messages.set("500-5", "Error during the user creation into the database.");
        this.messages.set("500-6", "The secret key for the JWT is not set in the app.");
    }

    getMessage(code:string): string {
        let message = this.messages.get(code);
        if (!message) {
            message = "Unknown error";
        }
        return message;
    }

}
