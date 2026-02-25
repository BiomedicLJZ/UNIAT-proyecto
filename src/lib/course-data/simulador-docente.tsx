import simuladorData from './json/simulador-docente.json';
import { SimuladorDocenteSchema } from './schema';

const parsed = SimuladorDocenteSchema.parse(simuladorData);

export const SIMULADOR_INFO = parsed.courseInfo;
export const ROUTES = parsed.routes;
