import {FDCRealValueResDto} from "@/Bis/FDC/Dto/FDCRealValueResDto";
import {FDCRepository} from "@/Bis/FDC/Domain/Repository/FDCRepository";
import {FDCRepositoryImpl} from "@/Bis/FDC/Data/Repository/FDCRepositoryImpl";

export interface FDCInputPortUseCase {
    getRealValueAll(): Promise<FDCRealValueResDto[]>
}

export class FDCUseCase implements FDCInputPortUseCase {


    fdcRepository: FDCRepository;

    constructor() {
        this.fdcRepository  = new FDCRepositoryImpl()
    }

    async getRealValueAll(): Promise<FDCRealValueResDto[]> {
        return await this.fdcRepository.getRealValueAll()
    }

}