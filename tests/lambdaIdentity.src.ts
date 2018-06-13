import * as expr from '..';

function convert<T>(f: (x: T) => T): expr.Expression<(x: T) => T>;
function convert<T>(e: expr.Expression<(x: T) => T>): expr.Expression<(x: T) => T>;
function convert<T>(a: any): expr.Expression<(x: T) => T> {
    return expr.checkExpressionParameter(a, 'f');
}

export default convert(x => x);