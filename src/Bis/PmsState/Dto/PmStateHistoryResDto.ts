import {SputterEqpResDto} from "@/Bis/SputterEqp/Dto/SputterEqpResDto";

export interface PmStateHistoryResDto {
    idx: number
    eqp: SputterEqpResDto
    schedulePM: boolean
    recycleN2: boolean
    chamber1: number
    chamber2: number
    updateTime: string
}
