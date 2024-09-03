
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../constants/order.constant';
import { Type } from 'class-transformer';

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number;

  constructor() {
    this.order = Order.ASC;
    this.page = 1;
    this.take = 10;
  }

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
