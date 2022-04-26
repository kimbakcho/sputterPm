import {WsLotSummaryResDto} from "@/Bis/WsLotSummary/Dto/WsLotSummaryResDto";
import {DateTime} from "luxon";

export interface MvOutGroupWsSummary {
    moveOutDttm: DateTime,
    items: WsLotSummaryResDto[],
    waferCount: number,
    cassetteId: string[]
}
