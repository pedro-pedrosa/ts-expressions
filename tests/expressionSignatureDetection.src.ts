import * as expr from '..';

interface TestInterface {
    numeric(e: number): expr.Expression<number>;
    numeric(e: expr.Expression<number>): expr.Expression<number>;
}
const testInterfaceImpl: TestInterface = {
    numeric(e: any): expr.Expression<number> {
        return expr.checkExpressionParameter(e, 'e');
    }
};

export const iinterface = () => testInterfaceImpl.numeric(1);