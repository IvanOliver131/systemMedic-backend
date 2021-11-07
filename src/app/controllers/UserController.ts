import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

class UserController {

    index(req: Request, res: Response) {
        return res.send({ userID: req.userId });
    }

    async store(req: Request, res: Response) {
        const repository = getRepository(User);
        const { username, email, password, type } = req.body;

        const userExists = await repository.findOne({ where: { email } });

        if (userExists) {
            return res.sendStatus(409);
        }

        const user = repository.create({ username, email, password, type });
        await repository.save(user);

        return res.json(user);
    }

    async ready(req: Request, res: Response){
        const repository = getRepository(User);
        const users = await repository.find();

        return res.json(users);
    }

    async readyBySpecific(req: Request, res: Response){
        const repository = getRepository(User);
        const { frase } = req.params;
        const lstUser = await repository.find();
        let userSpecific: any = [];

        if(lstUser === null){
            return res.status(404).json({ message: 'User not found!' });
        }

        lstUser.forEach((user)=>{
            if(user.username == frase || user.id == Number(frase) || user.email == frase){ 
                userSpecific.push(user);
            }
        });

        if(userSpecific == ''){
            return res.json(userSpecific);
        }

        return res.json(userSpecific);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const repository = getRepository(User);
        const user = await repository.findOne(id);
        if (user) {
            await repository.delete(user.id)
            return res.status(200).json({ message: 'User removed succesfully!' });
        }

        return res.status(404).json({ message: 'User not found!' });
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const repository = getRepository(User);
        const user = await repository.findOne(id);

        if (user != null) {
            await repository.update(user.id, req.body);
            return res.status(200).json({ message: 'User update success' });
        }
        return res.status(404).json({ message: 'User not found!' });
    }
}

export default new UserController();