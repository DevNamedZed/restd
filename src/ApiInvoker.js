
/**
 * Responsible for calling a service api.
 */
export default class ApiInvoker{
    constructor(callHandler, next){
        this.callHandler = callHandler;
        this.next = next;
    }

    static chainHandlers(callHandlers){
        var current = null;
    
        for (let index = callHandlers.length - 1; index >= 0; index--){
            current = new ApiInvoker(callHandlers[index], current);
        }
    
        return current;
    };

    invoke(request){
        var nextInvoker = null;
        if (this.next){
            nextInvoker = this.next.invoke.bind(this.next)
        }

        return this.callHandler.invoke(request, nextInvoker);
    };
}