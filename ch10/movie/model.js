import sqlite from 'sqlite3';

const db = new sqlite.Database('./movie.db');

export function getAll(options) {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM movies WHERE user = ? OR public = 1';

    if (options.sort && ['asc', 'desc'].includes(options.sort.toLowerCase())) {
      query += ' ORDER BY title ' + options.sort;
    }

    db.all(query, [options.userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export function get(id, userId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM movies WHERE id = ? AND (user = ? OR public = 1)';
    db.get(query, [id, userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export function save(movie, userId) {
  if (!movie.id) {
    return insert(movie, userId);
  } else {
    return update(movie, userId);
  }
}

function insert(movie, userId) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO movies (title, year, public, user) VALUES (?, ?, ?, ?)';
    db.run(query, [movie.title, movie.year, movie.public, userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function update(movie, userId) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE movies SET title = ?, year = ?, public = ?, user = ? WHERE id = ?';
    db.run(query, [movie.title, movie.year,  movie.public, userId, movie.id,], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export function remove(id, userId) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM movies WHERE id = ? AND (user = ? OR public = 1)';
    db.run(query, [id, userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export async function rate(rating) {
  const deleteQuery = 'DELETE FROM ratings WHERE movie = ? AND user = ?';
  await db.run(deleteQuery, [rating.movie, rating.user]);
  const insertQuery = 'INSERT INTO ratings (movie, user, rating) VALUES (?, ?, ?)';
  return db.run(insertQuery, [rating.movie, rating.user, rating.rating]);
}
