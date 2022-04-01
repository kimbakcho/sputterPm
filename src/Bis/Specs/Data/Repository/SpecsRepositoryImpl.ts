import {SpecsRepository} from "@/Bis/Specs/Domain/Repository/SpecsRepository";
import {SpecsInsertReqDto} from "@/Bis/Specs/Dto/SpecsInsertReqDto";
import {SpecsResDto} from "@/Bis/Specs/Dto/SpecsResDto";
import axios from "axios";


export default class SpecsRepositoryImpl implements SpecsRepository {

    async save(reqDto: SpecsInsertReqDto): Promise<SpecsResDto> {
        const { data } = await axios.post(`/specs`,reqDto)
        return data;
    }

    async getSpecsForEqp(eqpPmIdx: number): Promise<SpecsResDto[]> {
        const { data } = await axios.get(`/specs`,{
            params:{
                "eqpPmIdx": eqpPmIdx
            }
        });
        return data
    }

    async delete(idx: number): Promise<void> {
        return await axios.delete(`/specs`,{
            params:{
                "idx": idx
            }
        });
    }

}