import {SpecsInsertReqDto} from "@/Bis/Specs/Dto/SpecsInsertReqDto";
import {SpecsResDto} from "@/Bis/Specs/Dto/SpecsResDto";

import SpecsRepositoryImpl from "@/Bis/Specs/Data/Repository/SpecsRepositoryImpl";
import {SpecsRepository} from "@/Bis/Specs/Domain/Repository/SpecsRepository";
import axios from "axios";

export interface SpecsInputPortUseCase {
    save(reqDto: SpecsInsertReqDto): Promise<SpecsResDto>;
    getSpecsForEqp(eqpPmIdx: number): Promise<SpecsResDto[]>;
    delete(idx: number): Promise<void>
}

export class SpecsUseCase implements SpecsInputPortUseCase{

    private specsRepository: SpecsRepository;

    constructor() {
        this.specsRepository = new SpecsRepositoryImpl();
    }

    async save(reqDto: SpecsInsertReqDto): Promise<SpecsResDto> {
        return await this.specsRepository.save(reqDto);
    }

    async getSpecsForEqp(eqpPmIdx: number): Promise<SpecsResDto[]> {
        return await this.specsRepository.getSpecsForEqp(eqpPmIdx);
    }

    async delete(idx: number): Promise<void> {
        return await this.specsRepository.delete(idx);
    }


}