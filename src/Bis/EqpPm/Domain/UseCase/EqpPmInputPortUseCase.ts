import {EqpPmResDto} from "@/Bis/EqpPm/Dto/EqpPmResDto";
import {EqoPmRepositoryImpl} from "@/Bis/EqpPm/Data/Repository/EqoPmRepositoryImpl";
import {EqoPmRepository} from "@/Bis/EqpPm/Domain/Repository/EqoPmRepository";
import {EqpPmInsertReqDto} from "@/Bis/EqpPm/Dto/EqpPmInsertReqDto";

export interface EqpPmInputPortUseCase {
    getListAll(): Promise<EqpPmResDto[]>
    save(reqDto: EqpPmInsertReqDto): Promise<EqpPmResDto>
}

export class EqpPmUseCase implements EqpPmInputPortUseCase {

    private eqoPmRepository: EqoPmRepository;

    constructor() {
        this.eqoPmRepository = new EqoPmRepositoryImpl();
    }

    async getListAll(): Promise<EqpPmResDto[]> {
        return await this.eqoPmRepository.getListAll();
    }

    async save(reqDto: EqpPmInsertReqDto): Promise<EqpPmResDto> {
        return await this.eqoPmRepository.save(reqDto)
    }

}