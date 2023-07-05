import {Pageable} from "@/Bis/Common/Pageable";
import {Page} from "@/Bis/Common/Page";
import {YieldInfoResDto} from "@/Bis/Yield/Dto/YieldInfoResDto";
import axios from "axios";

export default class YieldUseCase {

    async getYieldInfos(filter: string,pageable: Pageable): Promise<Page<YieldInfoResDto>>{
        const { data }  = await axios.get(`yieldInfo`,{
            params: {
                ...pageable,
                "filter": filter,
            }
        })
        return data
    }
}
