import {EqpPmResDto} from "@/Bis/EqpPm/Dto/EqpPmResDto";

export interface SpecsResDto {
    idx: number;

    eqpPm: EqpPmResDto;

    spec: number;

    specName: string;
}