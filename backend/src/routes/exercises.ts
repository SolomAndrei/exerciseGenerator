import { Router } from 'express';
import { handleGenerateExercises, regenerateExercise } from '../controllers/exercise.controller';
import { validateExerciseInput } from '../middleware/validateExerciseInput';

const router = Router();

router.post('/', validateExerciseInput, handleGenerateExercises);
router.post('/regenerate/:level', validateExerciseInput, regenerateExercise);

export default router;
