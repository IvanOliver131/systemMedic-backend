import { Request, Response } from 'express';
import { getRepository, LessThanOrEqual, Raw} from 'typeorm';

import Medicine from '../models/Medicine';
import { MedicineDto } from '../validators/MedicineDto';

class MedicineController {

    async store(req: Request, res: Response) {
        const repository = getRepository(Medicine);
        const { name, estoque, type, fornecedor, nota_fiscal, valor, descricao } = req.body;

        const medicineValidator = new MedicineDto()
        try {
            await medicineValidator.createValidation().validate(req.body, { abortEarly: false })
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

        const medicineExists = await repository.findOne({ where: { nota_fiscal } });

        if (medicineExists) {
            return res.sendStatus(409);
        }

        const medicine = repository.create({ name, estoque, type, fornecedor, nota_fiscal, valor, descricao });
        await repository.save(medicine);

        return res.json(medicine);
    }

    async readyControl(req: Request, res: Response){
        const repository = getRepository(Medicine);
        const { type, dateIni, dateFim } = req.params;
        const medicines = await repository.find({
            where: {
                type: type,
                created_at: Raw((alias) => `${alias} <= :dateIni` && `${alias} >= :dateFim`, { dateIni: dateIni, dateFim: dateFim }),
            }
        });

        return res.json(medicines);
    }

    async readyByQtd(req: Request, res: Response){
        const repository = getRepository(Medicine);
        const medicines = await repository.find({
            estoque: LessThanOrEqual(15),
        });

        return res.json(medicines);
    }

    async ready(req: Request, res: Response){
        const repository = getRepository(Medicine);
        const medicines = await repository.find();

        return res.json(medicines);
    }

    async readyBySpecific(req: Request, res: Response){
        const repository = getRepository(Medicine);
        const { frase } = req.params;
        const lstMedicines = await repository.find();
        let medicineSpecific: any = [];

        if(lstMedicines === null){
            return res.status(404).json({ message: 'Medicine not found!' });
        }

        lstMedicines.forEach((medicine)=>{
            if(medicine.name == frase || medicine.id == Number(frase)){ 
                medicineSpecific.push(medicine);
            }
        });

        if(medicineSpecific == ''){
            return res.json(lstMedicines);
        }

        return res.json(medicineSpecific);
    }

    async readyByOne(req: Request, res: Response){
        const { id } = req.params;
        const repository = getRepository(Medicine);
        const medicine = await repository.findOne(id);

        if (medicine !== null) {
            return res.json(medicine);
        }
        return res.status(404).json({ message: 'Medicine not found!' });
    }

    async delete(req: Request, res: Response){
        const { id } = req.params;

        const repository = getRepository(Medicine);
        const medicine = await repository.findOne(id);
        if(medicine){
            await repository.delete(medicine.id)
            return res.status(200).json({ message: 'Medicine removed succesfully!' })
        }
        
        return res.status(404).json({ message: 'Medicine not found!' })
    }

    async update(req: Request, res: Response){
        const { id } = req.params;
        const repository = getRepository(Medicine);
        const medicine = await repository.findOne( id );

        if (medicine != null) {
            await repository.update(medicine.id, req.body);
            return res.status(200).json({ message: 'Medicine update success' });
        }
        return res.status(404).json({ message: 'Medicine not found!' });
    }

}

export default new MedicineController();
