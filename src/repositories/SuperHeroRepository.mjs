import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        const filtro = {};
        filtro[atributo] = valor;
        return await SuperHero.find(filtro);
    }
    

    async obtenerMayoresDe30() {
        return await SuperHero.find({ edad: { $gt: 30 } });
    }

    async crearSuperheroe(datos) {
        const nuevoSuperheroe = new SuperHero(datos);
        return await nuevoSuperheroe.save();
    }

    async obtenerMenoresDe30() {
        return await SuperHero.find({edad: { $lt:30}});
    }
}


export default new SuperHeroRepository();
