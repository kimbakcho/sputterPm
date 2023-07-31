import {PmStateResDto} from "@/Bis/PmsState/Dto/PmStateResDto";
import axios from "axios";
import {PmStateReqDto} from "@/Bis/PmsState/Dto/PmStateReqDto";
import {PmStateHistorySummaryReqDto} from "@/Bis/PmsState/Dto/PmStateHistorySummaryReqDto";
import {PmStateHistoryReqDto} from "@/Bis/PmsState/Dto/PmStateHistoryReqDto";
import {Page} from "@/Bis/Common/Page";
import {Pageable} from "@/Bis/Common/Pageable";
import {PmStateHistoryResDto} from "@/Bis/PmsState/Dto/PmStateHistoryResDto";
import {PmStateHistorySummaryResDto} from "@/Bis/PmsState/Dto/PmStateHistorySummaryResDto";

export default class PmStateUseCase {
    async getCurrent(): Promise<Array<PmStateResDto>>{
        const { data } =await axios.get("/pmState/current")
        return data;
    }

    async updatePM(reqDto: PmStateReqDto): Promise<Array<PmStateResDto>>{
        const { data } =await axios.post("/pmState/updatePM",reqDto)
        return data;
    }

    async getSummary(reqDto: PmStateHistorySummaryReqDto): Promise<Array<PmStateHistorySummaryResDto>>{
        const { data } =await axios.get("/pmState/historyCountSummary",{
            params: reqDto
        })
        return data;
    }

    async getHistory(pageable: Pageable,reqDto: PmStateHistoryReqDto): Promise<Page<PmStateHistoryResDto>>{
        const { data } = await axios.get("/pmState/history",{
            params:{
                ...reqDto,
                ...pageable
            }
        })
        return data
    }

    async deleteHistory(idx: number){
        await axios.delete("/pmState/history",{
            params:{
                "idx": idx
            }
        })
    }
}
