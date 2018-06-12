import { ExpressionBase } from './Expression';
import { ExpressionKind } from './ExpressionKind';

export class ParameterExpression extends ExpressionBase {
    constructor(name: string) {
        super();
        this.name = name;
    }
    kind = ExpressionKind.parameter;
    name: string;
}