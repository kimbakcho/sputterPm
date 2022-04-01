import {FDCRealValueResDto} from "@/Bis/FDC/Dto/FDCRealValueResDto";

export interface FDCRepository {
    getRealValueAll(): Promise<FDCRealValueResDto[]>
}