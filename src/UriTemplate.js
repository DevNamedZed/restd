
const TokenType = {
    TemplateParameter: 0,
    Value: 1,
    LevelSeperator: 2
};

function createUriTemplate(value) {
    let tokens = [];
    for (let index = 0; index < value.length; index++) {
        let start = index;
        let length = 1;

        if (value[index] == '/') {
            tokens.push({ type: TokenType.LevelSeperator });
        }
        else if (value[index] == '{') {
            while (index < value.length + 1 && value[index + 1] != '}') {
                length++;
                index++;
            }

            index++;
            if (value[index] != '}') {
                throw new Error('A } was expected.');
            }

            tokens.push({
                type: TokenType.TemplateParameter,
                value: value.substr(start + 1, length - 1)
            });
        }
        else {
            while (index < value.length + 1 && value[index + 1] != '/') {
                length++;
                index++;
            }

            tokens.push({
                type: TokenType.Value,
                value: value.substr(start, length)
            });
        }
    }

    return new UriTemplate(value, tokens);
}

class UriTemplate {
    constructor(template, tokens) {
        this.template = template;
        this.tokens = tokens;
    }

    build(parameters) {
        let output = "";
        for (let index = 0; index < this.tokens.length; index++) {
            const token = this.tokens[index];
            if (token.type === TokenType.LevelSeperator) {
                output += "/";
            }
            else if (token.type === TokenType.Value) {
                output += token.value;
            }
            else if (token.type === TokenType.TemplateParameter) {
                const parameterValue = parameters[token.value];
                if (!parameterValue) {
                    throw new Error(`Error creating uri, cannot bind parameter ${token.value}.`)
                }

                output += parameterValue;
            }
        }

        return output;
    }
}

export { createUriTemplate }