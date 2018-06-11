import * as expr from '..';

function convert<T>(f: ((x: T) => T)): expr.Expression;
function convert<T>(f: expr.Expression): expr.Expression;
function convert(f: any): expr.Expression {
    return expr.checkExpressionParameter(f, 'f');
}

export default convert(x => x);