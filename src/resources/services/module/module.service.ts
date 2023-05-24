import ModuleModel from '@/resources/models/module/module.model';
import { IModule } from '@/resources/interfaces/module/module.interface';

class ModuleService {
    private module = ModuleModel;

    public async create(
        title: string,
        description: string,
        category: string,
        content: any
    ): Promise<IModule> {
        const newModule = new this.module({
            title,
            description,
            category,
            content,
        });
        return await newModule.save();
    }

    public async getAll(): Promise<IModule[]> {
        return this.module.find({});
    }

    public async getById(id: string): Promise<IModule | null> {
        try {
            const module = await this.module.findById(id);
            return module;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getByCategory(category: string): Promise<IModule[]> {
        try {
            const modules = await this.module.find({ category });
            return modules;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async update(
        id: string,
        data: Partial<IModule>
    ): Promise<IModule | null> {
        try {
            const module = await this.module.findByIdAndUpdate(id, data, {
                new: true,
            });
            return module;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async delete(id: string): Promise<IModule | null> {
        try {
            const module = await this.module.findByIdAndDelete(id);
            return module;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default ModuleService;
