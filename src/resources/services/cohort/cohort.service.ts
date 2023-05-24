import CohortModel from '@/resources/models/cohort/cohort.model';
import { ICohort } from '@/resources/interfaces/cohort/cohort.interface';

class CohortService {
    private cohort = CohortModel;

    public async create(
        name: string,
        year: number,
        startDate: Date,
        endDate: Date
    ): Promise<ICohort> {
        const newCohort = new this.cohort({ name, year, startDate, endDate });
        return await newCohort.save();
    }

    public async getAll(): Promise<ICohort[]> {
        return this.cohort.find().populate('students modules');
    }

    public async getById(id: string): Promise<ICohort | null> {
        try {
            const cohort = await this.cohort
                .findById(id)
                .populate('students modules');
            return cohort;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getByYear(year: number): Promise<ICohort[]> {
        try {
            const cohorts = await this.cohort
                .find({ year })
                .populate('students modules');
            return cohorts;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async update(
        id: string,
        data: Partial<ICohort>
    ): Promise<ICohort | null> {
        try {
            const cohort = await this.cohort.findByIdAndUpdate(id, data, {
                new: true,
            });
            return cohort;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async delete(id: string): Promise<ICohort | null> {
        try {
            const cohort = await this.cohort.findByIdAndDelete(id);
            return cohort;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default CohortService;
