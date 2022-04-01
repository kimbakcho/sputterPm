import {EqoPmRepository} from "@/Bis/EqpPm/Domain/Repository/EqoPmRepository";
import {EqpPmResDto} from "@/Bis/EqpPm/Dto/EqpPmResDto";
import axios from "axios";
import Preference from "@/Bis/Preference/Preference";
import {EqpPmInsertReqDto} from "@/Bis/EqpPm/Dto/EqpPmInsertReqDto";

export class EqoPmRepositoryImpl implements EqoPmRepository {

    async getListAll(): Promise<EqpPmResDto[]> {
        const { data } =  await axios.get(`${Preference.backEndBase}/eqpPm`);
        return data
    }

    async save(reqDto: EqpPmInsertReqDto): Promise<EqpPmResDto> {
        const { data } = await axios.post(`${Preference.backEndBase}/eqpPm`,reqDto);
        return data;
    }

}