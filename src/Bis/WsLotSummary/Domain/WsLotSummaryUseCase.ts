import {WsLotSummaryReqDto} from "@/Bis/SputterEqp/Dto/WsLotSummaryReqDto";
import {WsLotSummaryResDto} from "@/Bis/WsLotSummary/Dto/WsLotSummaryResDto";
import axios from "axios";

export default class WsLotSummaryUseCase {

    async getWsLotSummary(reqDto: WsLotSummaryReqDto): Promise<WsLotSummaryResDto[]>{
        const { data } = await axios.get("/WsLotSummary",{
            params: reqDto
        })
        return data;
    }
}