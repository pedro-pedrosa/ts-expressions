import * as expr from '..';
import * as common from './lib/common';

export const scopeVariable: number = 1;
export function scopeFunction0(): number {
    return 0;
}
export function scopeFunction1(x: number): number {
    return 0;
}
export function scopeFunction2(x: number, y: number): number {
    return 0;
}
export const objectWithProps = {
    prop1: 'str'
};

export const constantNumber = () => common.numberExpression(5);
export const constantString = () => common.stringExpression('str');
export const constantBoolean = () => common.booleanExpression(true);
export const emptyArray = () => common.arrayOfNumberExpression([]);
export const numberArray = () => common.arrayOfNumberExpression([1, 2, 3, 4]);
export const variableAccess = () => common.numberExpression(scopeVariable);
export const binaryEquals = () => common.booleanExpression(scopeVariable == 5);
export const binaryStrictEquals = () => common.booleanExpression(scopeVariable === 5);
export const binaryNotEquals = () => common.booleanExpression(scopeVariable != 5);
export const binaryNotStrictEquals = () => common.booleanExpression(scopeVariable !== 5);
export const binaryAnd = () => common.booleanExpression(scopeVariable != 1 && scopeVariable == 5);
export const binaryOr = () => common.booleanExpression(scopeVariable == 1 || scopeVariable == 5);
export const binaryPlus = () => common.numberExpression(1 + 1);
export const binaryDivide = () => common.numberExpression(10 / 2);
export const binaryMultiply = () => common.numberExpression(3 * 2);
export const binaryMinus = () => common.numberExpression(10 - 2);
export const binaryGreaterThan = () => common.booleanExpression(10 > 2);
export const binaryGreaterThanOrEquals = () => common.booleanExpression(10 >= 2);
export const binaryLessThan = () => common.booleanExpression(10 < 2);
export const binaryLessThanOrEquals = () => common.booleanExpression(10 <= 2);
export const call0 = () => common.numberExpression(scopeFunction0());
export const call1 = () => common.numberExpression(scopeFunction1(scopeVariable));
export const call2 = () => common.numberExpression(scopeFunction2(scopeVariable, 1));
export const lambda0 = () => common.lambda0Expression(() => 1);
export const lambda1 = () => common.lambda1Expression(n => n);
export const lambda2 = () => common.lambda2Expression((x, y) => x + y);
export const objectLiteral = () => common.objectExpression({
    strProp: 'str',
    numberProp: 1
});
export const objectLiteralShorthand = () => common.objectExpression({
    scopeVariable,
    objectWithProps
});
export const propertyAccess = () => common.stringExpression(objectWithProps.prop1);
export const other = () => new DataSourceBase<{}>().filter(e => true).map(e => 'asd');


export interface IDataSource<T> {
    filter(predicate: expr.Expression<(element: T) => boolean>): IDataSource<T>;
    filter(predicate: (element: T) => boolean): IDataSource<T>;
    map<K>(projection: expr.Expression<(element: T) => K>): IDataSource<K>;
    map<K>(projection: (element: T) => K): IDataSource<K>;
}

export class DataSourceBase<T = any> implements IDataSource<T> {

    filter(predicate: expr.Expression<(element: T) => boolean>): IDataSource<T>;
    filter(predicate: (element: T) => boolean): IDataSource<T>;
    filter(predicateOrParameterName: expr.Expression<(element: T) => boolean> | ((element: T) => boolean)): IDataSource<T> {
        return new DataSourceBase<T>();
    }
    map<K>(projection: expr.Expression<(element: T) => K>): IDataSource<K>;
    map<K>(projection: (element: T) => K): IDataSource<K>;
    map<K>(projectionOrParameterName: expr.Expression<(element: T) => K> | ((element: T) => K)): IDataSource<T> {
        return new DataSourceBase<T>();
    }
}