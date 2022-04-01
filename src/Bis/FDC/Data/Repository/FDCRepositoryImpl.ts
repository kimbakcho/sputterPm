import {FDCRepository} from "@/Bis/FDC/Domain/Repository/FDCRepository";
import {FDCRealValueResDto} from "@/Bis/FDC/Dto/FDCRealValueResDto";
import axios from "axios";
import Preference from "@/Bis/Preference/Preference";

export class FDCRepositoryImpl implements FDCRepository {

    async getRealValueAll(): Promise<FDCRealValueResDto[]> {
        const { data }  = await axios.get(`${Preference.backEndBase}/FDC/RealValueAll`)
        return data;
    }
}