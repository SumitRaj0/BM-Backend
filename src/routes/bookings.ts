import { Router } from 'express';
import { getAllBookings, createBooking } from '../controller/bookingController';

const router = Router();

router.get('/', getAllBookings);
router.post('/', createBooking);

export default router;
