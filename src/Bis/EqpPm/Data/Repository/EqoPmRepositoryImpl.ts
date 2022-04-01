import {EqoPmRepository} from "@/Bis/EqpPm/Domain/Repository/EqoPmRepository";
import {EqpPmResDto} from "@/Bis/EqpPm/Dto/EqpPmResDto";


import {EqpPmInsertReqDto} from "@/Bis/EqpPm/Dto/EqpPmInsertReqDto";
import axios from "axios";

export class EqoPmRepositoryImpl implements EqoPmRepository {

    async getListAll(): Promise<EqpPmResDto[]> {
        const { data } =  await axios.get(`/eqpPm`);
        return data
    }

    async save(reqDto: EqpPmInsertReqDto): Promise<EqpPmResDto> {
        const { data } = await axios.post(`/eqpPm`,reqDto);
        return data;
    }

}