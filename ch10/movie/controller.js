import { getAll, get, save, remove } from "./model.js";
import validator, { validationResult } from "express-validator";

function getLinks(current, base) {
  const links = [
    {rel: 'base', href: base},
    {rel: 'sort-ascending', href: base + '?sort=asc'},
    {rel: 'sort-descending', href: base + '?sort=desc'}
  ];

  return links.map((link) => {
    if (current.length > 0 && link.rel.includes(current)) {
      link.rel = 'self';
    } else if (current.length === 0 && link.rel === 'base') {
      link.rel = 'self';
    }
    return link;
  });
}
export async function listAction(request, response) {
  try {
    const options = {
      userId: request.auth.id,
      sort: request.query.sort ? request.query.sort : ''
    };

    const movies = await getAll(options);
    const movieResponse = {
      movies,
      links: getLinks(options.sort, request.baseUrl)
    };
    response.json(movieResponse);
  } catch (e) {
    console.error(e);
    response.status(500).send('An error happened');
  }
}

export async function detailAction(request, response) {
  try {
    const movie = await get(request.params.id, request.auth.id);

    if (!movie) {
      response.status(404).send('Not found');
      return;
    }

    const movieResponse = {
      ...movie,
      links: [{rel: 'self', href: `${request.baseUrl}/${movie.id}`}]
    };
    response.json(movieResponse);
  } catch (e) {
    console.error(e);
    response.status(500).send('An error happened');
  }
}

export async function createAction(request, response) {
  try {
    const errors = validator.validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({errors: errors.array()});
    }

    const movie = {
      title: request.body.title,
      year: request.body.year,
      public: parseInt(request.body.public, 10) === 1 ? 1 : 0
    };
    const newMovie = await save(movie, request.auth.id);
    response.status(201).json(newMovie);
  } catch (e) {
    console.error(e);
    response.status(500).send('An error happened');
  }
}

export async function updateAction(request, response){
  try {
    const movie = {
      id: request.params.id,
      title: request.body.title,
      year: request.body.year,
      public: parseInt(request.body.public, 10) === 1 ? 1 : 0
    };

    const updateMovie = await save(movie, request.auth.id);
    response.json(updateMovie);
  } catch (e) {
    console.error(e);
    response.status(500).send('An error happened');
  }
}

export async function deleteAction(request, response) {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({errors: errors.array()});
    }

    const id = parseInt(request.params.id, 10);
    await remove(id, request.auth.id);
    response.status(204).send();
  } catch (e) {
    console.error(e);
    response.status(500).send('An error happened');
  }
}
