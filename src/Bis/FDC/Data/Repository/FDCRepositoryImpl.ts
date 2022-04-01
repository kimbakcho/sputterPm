import {FDCRepository} from "@/Bis/FDC/Domain/Repository/FDCRepository";
import {FDCRealValueResDto} from "@/Bis/FDC/Dto/FDCRealValueResDto";
import axios from "axios";


export class FDCRepositoryImpl implements FDCRepository {

    async getRealValueAll(): Promise<FDCRealValueResDto[]> {
        const { data }  = await axios.get(`/FDC/RealValueAll`)
        return data;
    }
}