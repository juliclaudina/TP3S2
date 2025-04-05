import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, obtenerSuperheroesMenoresDe30} from '../services/superheroesService.mjs';
import { renderizarListaSuperheroes, renderizarSuperheroe } from '../views/responseView.mjs';
    

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).json({ message: 'Superhéroe no encontrado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el superhéroe',
            error: error.message });
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes',
            error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes con ese atributo' });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los superhéroes',
            error: error.message });
    }
}


export async function crearSuperheroeController(req, res) {
    try {
        const { nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador } = req.body; // Extraer datos del body

        // Validar que los campos requeridos no estén vacíos
        if (!nombreSuperHeroe || !nombreReal) {
            return res.status(400).json({ mensaje: "Los campos nombreSuperHeroe y nombreReal son obligatorios" });
        }

        // Crear una nueva instancia del modelo
        const nuevoSuperheroe = new SuperHero({
            nombreSuperHeroe,
            nombreReal,
            edad,
            planetaOrigen,
            debilidad,
            poderes,
            aliados,
            enemigos,
            creador
        });

        // Guardar en la base de datos
        const superheroeGuardado = await nuevoSuperheroe.save();

        // Responder con el superhéroe creado
        res.status(201).json(superheroeGuardado);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear el superhéroe",
            error: error.message,
        });
    }
}


export async function obtenerSuperheroesMayoresDe30Controller(req, res) {

    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if(superheroes.length === 0){
            return res.status(404).send(
                {mensaje: 'No hay superheroes mayores de 30'}
            );
        } 

        const superHeroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superHeroesFormateados);
    } catch (error) {
        res.status(500).send(
            {
                mensaje: 'error al obtener superheroes mayores de 30 años', error: error.message
            }
        ); 
    }

}

export async function obtenerSuperheroesMenoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMenoresDe30(); 
        if (superheroes.length === 0){
            return res.status(404).send(
                {mensaje: 'No hay superheroes menores de 30'}
            );

        }

        const superHeroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superHeroesFormateados);

        } catch (error) {
        
            res.status(500).send(
                {
                    mensaje: 'error al obtener superheroes menores de 30 años', error: error.message
                }
            );
    }

}