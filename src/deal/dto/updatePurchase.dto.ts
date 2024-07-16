import { PartialType } from "@nestjs/mapped-types";
import { PurchaseCreateDto } from "./purchase.dto";

export class UpdatePurchaseDto extends PartialType(PurchaseCreateDto) {}