import {SpecsInsertReqDto} from "@/Bis/Specs/Dto/SpecsInsertReqDto";
import {SpecsResDto} from "@/Bis/Specs/Dto/SpecsResDto";

export interface SpecsRepository {
    save(reqDto: SpecsInsertReqDto): Promise<SpecsResDto>;
    getSpecsForEqp(eqpPmIdx: number): Promise<SpecsResDto[]>;
    delete(idx: number): Promise<void>;
}