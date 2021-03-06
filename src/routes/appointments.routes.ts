import {Router} from 'express';
import { getCustomRepository } from 'typeorm';
import {parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../sevices/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response)=>{

console.log(request.user);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) =>{
    try{

        const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();
       
        const appointment = await createAppointment.excute({
            provider,
            date: parsedDate
        });

        return response.json({appointment});
        }catch(err){
            return response.status(400).json({ error: err.message });
            }
});

export default appointmentsRouter;