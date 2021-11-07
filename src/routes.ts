import { Router } from "express";

import authMiddleware from "./app/middlewares/authMiddleware";

import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import PacientController from "./app/controllers/PacientController";
import MedicineController from "./app/controllers/MedicineController";
import PacientMedicineController from "./app/controllers/PacientMedicineController";

const router = Router();

/*AUTENTICAÇÃO*/
router.post('/auth', AuthController.authenticate);

/*USERS*/
router.post('/users', UserController.store);
router.get('/users', UserController.ready);
router.get('/users/:frase', UserController.readyBySpecific);
router.delete('/users/:id', UserController.delete);
router.put('/users/:id', UserController.update);
router.get('/user', authMiddleware, UserController.index);

/*PACIENT*/
router.post('/pacient', PacientController.store);
router.get('/pacient', PacientController.ready);
router.get('/pacient/:frase', PacientController.readyBySpecific);
router.get('/pacient/:id', PacientController.readyByOne);
router.delete('/pacient/:id', PacientController.delete);
router.put('/pacient/:id', PacientController.update);

/*MEDICINE*/
router.post('/medicine', MedicineController.store);
router.get('/medicine', MedicineController.ready);
router.get('/medicine/reposicao', MedicineController.readyByQtd);
router.get('/medicine/:frase', MedicineController.readyBySpecific);
router.get('/medicine/control/:type/:dateIni/:dateFim', MedicineController.readyControl);
router.get('/medicine/:id', MedicineController.readyByOne);
router.delete('/medicine/:id', MedicineController.delete);
router.put('/medicine/:id', MedicineController.update);

/*PACIENT AND MEDICINE */
router.post('/pacientMedicine', PacientMedicineController.store);
router.get('/pacientMedicine', PacientMedicineController.ready);
router.get('/pacientMedicine/:id', PacientMedicineController.readyByOne);
router.get('/pacientMedicine/:dateIni/:dateFim', PacientMedicineController.readyAllByDate);
router.get('/pacientMedicine/:frase', PacientMedicineController.readyBySpecific);
//router.delete('/pacientMedicine/:id', PacientMedicineController.delete);
//router.put('/pacientMedicine/:id', PacientMedicineController.update);

export default router;