import {WsLotSummaryPkResDto} from "@/Bis/WsLotSummary/Dto/WsLotSummaryPkResDto";

export interface WsLotSummaryResDto {
    wsLotSummaryPk: WsLotSummaryPkResDto;

    workDate: string;

    cassetteId: string;

    materialId: string;

    carrierId: string;

    WaferId: string;

    equipmentId: string;

    moveInDttm: string;

    moveOutDttm: string;
}