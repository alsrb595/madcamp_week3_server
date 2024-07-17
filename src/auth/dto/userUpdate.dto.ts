import { PartialType } from "@nestjs/mapped-types";
import { UserGetDto } from "./user.dto";

export class UserUpdateDto extends PartialType(UserGetDto) {}