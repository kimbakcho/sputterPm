import {EqpPmResDto} from "@/Bis/EqpPm/Dto/EqpPmResDto";
import {EqpPmInsertReqDto} from "@/Bis/EqpPm/Dto/EqpPmInsertReqDto";

export interface EqoPmRepository {
    getListAll(): Promise<EqpPmResDto[]>


    save(reqDto: EqpPmInsertReqDto): Promise<EqpPmResDto>;
}