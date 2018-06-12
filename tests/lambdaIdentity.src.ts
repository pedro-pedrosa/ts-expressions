import * as expr from '..';

function convert<T>(f: (x: T) => T): expr.Expression<(x: T) => T>;
function convert<T>(f: expr.Expression<T>): expr.Expression<T>;
function convert<T>(f: any): expr.Expression<T> {
    return expr.checkExpressionParameter(f, 'f');
}

export default convert(x => x);