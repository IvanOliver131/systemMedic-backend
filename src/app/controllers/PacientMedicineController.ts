import { Request, Response } from 'express';
import { CustomRepositoryCannotInheritRepositoryError, getRepository, Raw } from 'typeorm';
import Medicine from '../models/Medicine';

import PacientMedicine from '../models/PacientMedicine';

class PacientController {

    async store(req: Request, res: Response) {
        const repository = getRepository(PacientMedicine);
        const repositoryMedicine = getRepository(Medicine);
        const { id_pacient, lstMedicine } = req.body;

        let pacientMedicine: any[] = [];
        lstMedicine.forEach(async (item: any) => {
            pacientMedicine.push(
                repository.create({
                    id_pacient,
                    id_medicine: item.id_medicine,
                    qtd_medicine: item.qtd_medicine
                })
            )
            
            const medicine = await repositoryMedicine.findOne( item.id_medicine );

            if (medicine != null) {
                const newEstoque = medicine.estoque - item.qtd_medicine;
                const retirada = {
                    estoque: newEstoque
                }

                await repositoryMedicine.update(medicine.id, retirada);
            }
        });      

        await repository.save(pacientMedicine);
        return res.status(200).json({ message: 'Medicamentos retirados' })
    }

    async ready(req: Request, res: Response) {
        const repository = getRepository(PacientMedicine);
        const drugWithdrawal = await repository.find({
            order: {
                id_pacient: "ASC"
            }
        });

        return res.json(drugWithdrawal);
    }

    async readyByOne(req: Request, res: Response) {
        const { id } = req.params;
        const repository = getRepository(PacientMedicine);
        const drugWithdrawal = await repository.findOne(id);

        if (drugWithdrawal != null) {
            return res.json(drugWithdrawal);
        }
        return res.status(404).json({ message: 'Pacient not found!' })
    }

    async readyAllByDate(req: Request, res: Response){
        const repository = getRepository(PacientMedicine);
        const { dateIni, dateFim } = req.params;
        const retiradas = await repository.find({
            where: {
                created_at: Raw((alias) => `${alias} <= :dateIni` && `${alias} >= :dateFim`, { dateIni: dateIni, dateFim: dateFim }),
            }
        });

        return res.json(retiradas);
    }

    async readyBySpecific(req: Request, res: Response){
        const repository = getRepository(PacientMedicine);
        const { frase } = req.params;
        console.log(frase)
        const lstRetirada = await repository.find();
        let retiradaSpecific: any = [];

        if(lstRetirada === null){
            return res.status(404).json({ message: 'Retirada not found!' });
        }

        lstRetirada.forEach((user)=>{
            if(user.id_pacient == Number(frase)){ 
                retiradaSpecific.push(user);
            }
        });

        if(retiradaSpecific == ''){
            return res.json(retiradaSpecific);
        }

        console.log(retiradaSpecific)

        return res.json(retiradaSpecific);
    }

}

export default new PacientController();