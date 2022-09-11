import {Test} from "./interfaces";
import {Repository} from "typeorm";

export class StorageService {

    constructor(private TestRepository: Repository<Test>) {
    }

    async getTestById(id: number) {
        const result = await this.TestRepository.findOneBy({id});
        return result;
    }

    async postTest(test: Test) {
        const candidate = await this.getTestById(test.id);
        if (candidate) return;

        const result = await this.TestRepository.save(test);
        return result;
    }

    async putTest(test: Test) {
        const candidate = await this.getTestById(test.id);
        if (!candidate) return;

        Object.assign(candidate, test);
        await this.TestRepository.save(candidate);
        return candidate;
    }

    async deleteTestById(id: number) {
        const candidate = await this.getTestById(id);
        if (!candidate) return;

        await this.TestRepository.delete(candidate);
        return candidate;
    }
}