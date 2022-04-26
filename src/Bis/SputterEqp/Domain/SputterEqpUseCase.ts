import axios from "axios";
import {SputterEqpReqDto} from "@/Bis/SputterEqp/Dto/SputterEqpReqDto";
import {SputterEqpResDto} from "@/Bis/SputterEqp/Dto/SputterEqpResDto";

export default class SputterEqpUseCase {

    async save(reqDto: SputterEqpReqDto): Promise<void>{
        await axios.post("/sputterEap",reqDto);
    }

    async getList() :Promise<SputterEqpResDto[]> {
        const { data } = await axios.get("/sputterEap");
        return data;
    }

    async delete(idx: number): Promise<void>{
        await axios.delete("/sputterEap",{
            params:{
                "idx": idx
            }
        })
    }

}