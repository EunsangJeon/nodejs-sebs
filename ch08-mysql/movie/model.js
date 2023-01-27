import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'topSecret',
  database: 'movie-db',
});

await connection.connect();

export async function getAll() {
  const query = 'SELECT * FROM movies';
  const [data] = await connection.query(query);
  return data;
}

export async function get(id) {
  const query = 'SELECT * FROM movies WHERE id = ?';
  const [data] = await connection.query(query, [id]);
  return data.pop();
}

export async function insert(movie) {
  const query = 'INSERT INTO movies (title, year) VALUES (?, ?)';
  const [result] = await connection.query(query, [movie.title, movie.year]);
  return {...movie, id: result.insertId}
}

export function save(movie) {
  if (!movie.id) {
    return insert(movie);
  } else {
    return update(movie);
  }
}

export async function update(movie) {
  const query = 'UPDATE movies SET title = ?, year = ? WHERE id = ?';
  await connection.query(query, [movie.title, movie.year, movie.id]);
  return movie;
}

export async function remove(id) {
  const query = 'DELETE FROM movies WHERE id = ?';
  await connection.query(query, [id]);
  return;
}
