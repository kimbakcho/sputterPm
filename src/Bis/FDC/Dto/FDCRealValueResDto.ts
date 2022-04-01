import {SpecsResDto} from "@/Bis/Specs/Dto/SpecsResDto";

export interface FDCRealValueResDto {
    value: number
    eqpId: string
    eqpName: string
    dateTime: string
    specs: SpecsResDto[]
}