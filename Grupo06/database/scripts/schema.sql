CREATE SCHEMA trailerflix;

CREATE TABLE trailerflix.categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    temporadas INT
);

CREATE TABLE trailerflix.generos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE trailerflix.tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE trailerflix.actors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE trailerflix.contenidos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    poster VARCHAR(100),
    trailer VARCHAR(100),
    resumen VARCHAR(1000) NOT NULL,
    id_cat INT NOT NULL,
    id_gen INT NOT NULL,
    FOREIGN KEY (id_cat) REFERENCES trailerflix.categorias(id),
    FOREIGN KEY (id_gen) REFERENCES trailerflix.generos(id)
);

CREATE TABLE trailerflix.tags_de_contenidos (
    contenido_id BIGINT,
    tag_id INT,
    FOREIGN KEY (contenido_id) REFERENCES trailerflix.contenidos(id),
    FOREIGN KEY (tag_id) REFERENCES trailerflix.tags(id)
);

CREATE TABLE trailerflix.reparto_de_contenidos (
    contenido_id BIGINT,
    actor_id INT,
    FOREIGN KEY (contenido_id) REFERENCES trailerflix.contenidos(id),
    FOREIGN KEY (actor_id) REFERENCES trailerflix.actors(id)
);