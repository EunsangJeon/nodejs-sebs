import sqlite from 'sqlite3';

const db = new sqlite.Database('./movie.db');

export function getAll() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM movies';
    db.all(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export function get(id) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM movies WHERE id = ?';
    db.get(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export function save(movie) {
  if (!movie.id) {
    return insert(movie);
  } else {
    return update(movie);
  }
}

function insert(movie) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO movies (title, year) VALUES (?, ?)';
    db.run(query, [movie.title, movie.year], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function update(movie) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE movies SET title = ?, year = ? WHERE id = ?';
    db.run(query, [movie.title, movie.year, movie.id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export function remove(id) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM movies WHERE id = ?';
    db.run(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}