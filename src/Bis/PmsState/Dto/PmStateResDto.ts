import {SputterEqpResDto} from "@/Bis/SputterEqp/Dto/SputterEqpResDto";

export interface PmStateResDto {
    idx: number
    eqp: SputterEqpResDto
    schedulePM: boolean
    recycleN2: boolean
    vacuumClean2: boolean
    updateTime: string
}
