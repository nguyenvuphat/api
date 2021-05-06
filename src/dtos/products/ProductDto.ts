import {BaseDto} from "../BaseDto";
import {PRODUCT} from "../SchemaTypes";

export class ProductDto extends BaseDto {
  constructor() {
    super(PRODUCT)
  }
}
