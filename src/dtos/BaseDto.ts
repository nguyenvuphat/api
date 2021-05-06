import SimpleSchema from "simpl-schema";

export class BaseDto {
  private readonly _schema: SimpleSchema;

  constructor(schema: Object) {
    this._schema = new SimpleSchema(schema);
  }

  get simpleSchema(): SimpleSchema {
    return this._schema;
  }
}
