import { StringValue, NumberValue, ColorValue, Literal, AllTokens, Bracket, WhiteSpace, Operator, OperatorType, Field } from '../tokenizer/tokens';
import tokenScanner, { TokenScanner, readable, peek, consume, error } from './TokenScanner';

export type Value = StringValue | NumberValue | ColorValue | Literal | FunctionCall | Field;

export interface FunctionCall {
    type: 'FunctionCall';
    name: string;
    arguments: CSSValue[];
}

export interface CSSValue {
    type: 'CSSValue';
    value: Value[];
}

export interface CSSProperty {
    name?: string;
    value: CSSValue[];
    important: boolean;
    /** Snippet matched with current property */
    snippet?: any;
}

export interface ParseOptions {
    /** Consumes given abbreviation tokens as value */
    value?: boolean;
}

export default function parser(tokens: AllTokens[], options: ParseOptions = {}): CSSProperty[] {
    const scanner = tokenScanner(tokens);
    const result: CSSProperty[] = [];
    let property: CSSProperty | undefined;

    while (readable(scanner)) {
        if (property = consumeProperty(scanner, options)) {
            result.push(property);
        } else if (!consume(scanner, isSiblingOperator)) {
            throw error(scanner, 'Unexpected token');
        }
    }

    return result;
}

/**
 * Consumes single CSS property
 */
function consumeProperty(scanner: TokenScanner, options: ParseOptions): CSSProperty | undefined {
    let name: string | undefined;
    let important = false;
    let valueFragment: CSSValue | undefined;
    const value: CSSValue[] = [];
    const token = peek(scanner)!;
    const valueMode = !!options.value;

    if (!valueMode && isLiteral(token) && !isFunctionStart(scanner)) {
        scanner.pos++;
        name = token.value;
        // Consume any following value delimiter after property name
        consume(scanner, isValueDelimiter);
    }

    // Skip whitespace right after property name, if any
    if (valueMode) {
        consume(scanner, isWhiteSpace);
    }

    while (readable(scanner)) {
        if (consume(scanner, isImportant)) {
            important = true;
        } else if (valueFragment = consumeValue(scanner, valueMode)) {
            value.push(valueFragment);
        } else if (!consume(scanner, isFragmentDelimiter)) {
            break;
        }
    }

    if (name || value.length || important) {
        return { name, value, important };
    }
}

/**
 * Consumes single value fragment, e.g. all value tokens before comma
 */
function consumeValue(scanner: TokenScanner, inArgument: boolean): CSSValue | undefined {
    const result: Value[] = [];
    let token: AllTokens | undefined;
    let args: CSSValue[] | undefined;

    while (readable(scanner)) {
        token = peek(scanner)!;
        if (isValue(token)) {
            scanner.pos++;

            if (isLiteral(token) && (args = consumeArguments(scanner))) {
                result.push({
                    type: 'FunctionCall',
                    name: token.value,
                    arguments: args
                } as FunctionCall);
            } else {
                result.push(token);
            }
        } else if (isValueDelimiter(token) || (inArgument && isWhiteSpace(token))) {
            scanner.pos++;
        } else {
            break;
        }
    }

    return result.length
        ? { type: 'CSSValue', value: result }
        : void 0;
}

function consumeArguments(scanner: TokenScanner): CSSValue[] | undefined {
    const start = scanner.pos;
    if (consume(scanner, isOpenBracket)) {
        const args: CSSValue[] = [];
        let value: CSSValue | undefined;

        while (readable(scanner) && !consume(scanner, isCloseBracket)) {
            if (value = consumeValue(scanner, true)) {
                args.push(value);
            } else if (!consume(scanner, isWhiteSpace) && !consume(scanner, isArgumentDelimiter)) {
                throw error(scanner, 'Unexpected token');
            }
        }

        scanner.start = start;
        return args;
    }
}

function isLiteral(token: AllTokens): token is Literal {
    return token && token.type === 'Literal';
}

function isBracket(token: AllTokens, open?: boolean): token is Bracket {
    return token && token.type === 'Bracket' && (open == null || token.open === open);
}

function isOpenBracket(token: AllTokens) {
    return isBracket(token, true);
}

function isCloseBracket(token: AllTokens) {
    return isBracket(token, false);
}

function isWhiteSpace(token: AllTokens): token is WhiteSpace {
    return token && token.type === 'WhiteSpace';
}

function isOperator(token: AllTokens, operator?: OperatorType): token is Operator {
    return token && token.type === 'Operator' && (!operator || token.operator === operator);
}

function isSiblingOperator(token: AllTokens) {
    return isOperator(token, OperatorType.Sibling);
}

function isArgumentDelimiter(token: AllTokens) {
    return isOperator(token, OperatorType.ArgumentDelimiter);
}

function isFragmentDelimiter(token: AllTokens) {
    return isArgumentDelimiter(token);
}

function isImportant(token: AllTokens) {
    return isOperator(token, OperatorType.Important);
}

function isValue(token: AllTokens): token is StringValue | NumberValue | ColorValue | Literal {
    return token.type === 'StringValue'
        || token.type === 'ColorValue'
        || token.type === 'NumberValue'
        || token.type === 'Literal'
        || token.type === 'Field';
}

function isValueDelimiter(token: AllTokens): boolean {
    return isOperator(token, OperatorType.PropertyDelimiter)
        || isOperator(token, OperatorType.ValueDelimiter);
}

function isFunctionStart(scanner: TokenScanner): boolean {
    const t1 = scanner.tokens[scanner.pos];
    const t2 = scanner.tokens[scanner.pos + 1];
    return t1 && t2 && isLiteral(t1) && t2.type === 'Bracket';
}
