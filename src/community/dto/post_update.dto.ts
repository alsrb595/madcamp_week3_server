import { PartialType } from "@nestjs/mapped-types";
import { PostCreateDto } from "./post_create.dto";

export class UpdatePostDto extends PartialType(PostCreateDto) {}