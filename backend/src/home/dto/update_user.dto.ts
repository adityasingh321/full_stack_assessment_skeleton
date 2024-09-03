import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateUsersDto {
    @IsNumber()
    @IsNotEmpty()
    public homeId: number;

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    public userIds: number[];
  }