import ApiFunctionInvoker from './ApiFunctionInvoker';


export default function createApiProxy(obj, client) {
    var methods = findApiFunctions(obj);
    var apiInvokers = methods.map(x => createApiInvoker(x));

    var proxy =  apiInvokers.reduce((obj, item) => {
        obj[item.name] = function(){
            return item.invoke.apply(item, [client, [...arguments]])
        }.bind(item);
        
        return obj;
      }, {})
      
      return proxy;
}

function createApiInvoker(method) {    
    var parameters = (method.apiFunction.parameters || []).map( 
        (p, i) =>
        {
            p.index = i;
            return p;
        });

    return new ApiFunctionInvoker(
        method.name,
        method.apiFunction.httpMethod,
        method.apiFunction.template,
        parameters,
        method.apiFunction.responseType || "json");
}

function findApiFunctions(obj) {
    var result = []
    var current = obj;

    do {
        var keys = Object.getOwnPropertyNames(current);
        for (var index = 0; index < keys.length; index++){
            var func = current[keys[index]];
            if (func && typeof func == "function" && func.apiFunction){
                result.push(func);
            }
        }

    } while ((current = Object.getPrototypeOf(current)))

    return result;
}