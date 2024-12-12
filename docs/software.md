# Реалізація інформаційного та програмного забезпечення
 
## SQL-скрипт для створення на початкового наповнення бази даних

```mysql

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema OpenDataModel
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `OpenDataModel` ;

-- -----------------------------------------------------
-- Schema OpenDataModel
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `OpenDataModel` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci ;
USE `OpenDataModel` ;

-- -----------------------------------------------------
-- Table `OpenDataModel`.`Categoty`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`Category` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`Category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `parent_category_id` INT NULL,
  PRIMARY KEY (`category_id`),
  INDEX `parent_category_idx` (`parent_category_id` ASC) INVISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `parent_category`
    FOREIGN KEY (`parent_category_id`)
    REFERENCES `OpenDataModel`.`Category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDataModel`.`Tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`Tag` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`Tag` (
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDataModel`.`Data`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`Data` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`Data` (
  `data_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NULL,
  `format` VARCHAR(45) NOT NULL,
  `content` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`data_id`, `category_id`),
  INDEX `fk_Data_Categoty_idx` (`category_id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `fk_Data_Category`
    FOREIGN KEY (`category_id`)
    REFERENCES `OpenDataModel`.`Category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDataModel`.`Link`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`Link` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`Link` (
  `link_id` INT NOT NULL AUTO_INCREMENT,
  `data_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`link_id`, `data_id`, `tag_id`),
  INDEX `fk_Link_Data_idx` (`data_id` ASC) VISIBLE,
  INDEX `fk_Link_Tag_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `fk_Link_Data`
    FOREIGN KEY (`data_id`)
    REFERENCES `OpenDataModel`.`Data` (`data_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Link_Tag`
    FOREIGN KEY (`tag_id`)
    REFERENCES `OpenDataModel`.`Tag` (`tag_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDataModel`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`Role` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`Role` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDataModel`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`User` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`User` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `login` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDataModel`.`Access`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OpenDataModel`.`Access` ;

CREATE TABLE IF NOT EXISTS `OpenDataModel`.`Access` (
  `access_id` INT NOT NULL AUTO_INCREMENT,
  `data_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`access_id`, `data_id`, `user_id`, `role_id`),
  INDEX `fk_Access_Data_idx` (`data_id` ASC) VISIBLE,
  INDEX `fk_Access_Role_idx` (`role_id` ASC) VISIBLE,
  INDEX `fk_Access_User_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Access_Data`
    FOREIGN KEY (`data_id`)
    REFERENCES `OpenDataModel`.`Data` (`data_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Access_Role`
    FOREIGN KEY (`role_id`)
    REFERENCES `OpenDataModel`.`Role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Access_User`
    FOREIGN KEY (`user_id`)
    REFERENCES `OpenDataModel`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`Category`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`Category` (`category_id`, `name`, `parent_category_id`) VALUES (DEFAULT, 'Географія', NULL);
INSERT INTO `OpenDataModel`.`Category` (`category_id`, `name`, `parent_category_id`) VALUES (DEFAULT, 'Статистика', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`Tag`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`Tag` (`tag_id`, `name`) VALUES (DEFAULT, 'Тег: статистика');
INSERT INTO `OpenDataModel`.`Tag` (`tag_id`, `name`) VALUES (DEFAULT, 'Тег: географія');

COMMIT;


-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`Data`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`Data` (`data_id`, `name`, `description`, `format`, `content`, `createdAt`, `updatedAt`, `category_id`) VALUES (DEFAULT, 'Статистика', 'Важлива статистика', 'txt', 'txt', '2038-01-19 03:14:07', '2039-01-19 03:14:07', 1);
INSERT INTO `OpenDataModel`.`Data` (`data_id`, `name`, `description`, `format`, `content`, `createdAt`, `updatedAt`, `category_id`) VALUES (DEFAULT, 'Географія', 'Важливі дані', 'png', 'png', '2027-01-19 03:14:07', '2030-01-19 03:14:07', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`Link`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`Link` (`link_id`, `data_id`, `tag_id`) VALUES (DEFAULT, 1, 1);
INSERT INTO `OpenDataModel`.`Link` (`link_id`, `data_id`, `tag_id`) VALUES (DEFAULT, 2, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`Role`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`Role` (`role_id`, `name`) VALUES (DEFAULT, 'Користувач');
INSERT INTO `OpenDataModel`.`Role` (`role_id`, `name`) VALUES (DEFAULT, 'Адміністратор');

COMMIT;


-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`User`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`User` (`user_id`, `firstname`, `lastname`, `email`, `login`, `password`) VALUES (DEFAULT, 'Іван', 'Рєзник', 'rieznyk@gmail.com', 'ivan', '1234');
INSERT INTO `OpenDataModel`.`User` (`user_id`, `firstname`, `lastname`, `email`, `login`, `password`) VALUES (DEFAULT, 'Нікіта', 'Пляко', 'plyako@gmail.com', 'nikito4ka', '5678');

COMMIT;


-- -----------------------------------------------------
-- Data for table `OpenDataModel`.`Access`
-- -----------------------------------------------------
START TRANSACTION;
USE `OpenDataModel`;
INSERT INTO `OpenDataModel`.`Access` (`access_id`, `data_id`, `role_id`, `user_id`) VALUES (DEFAULT, 1, 1, 1);
INSERT INTO `OpenDataModel`.`Access` (`access_id`, `data_id`, `role_id`, `user_id`) VALUES (DEFAULT, 2, 2, 2);

COMMIT;

```

## RESTfull сервіс для управління даними

### Підключення до бази даних

```javascript
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'opendatamodel',
    waitForConnections: true,
});

export default pool;
```

### Налаштування сервера

```javascript
import router from './router/router.js';
import express from 'express';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Маршрути для Data

```javascript
import { Router } from "express";
import dataController from "../controllers/dataController.js";

const dataRouter = Router();

dataRouter.get('/all', dataController.getData);
dataRouter.get('/:id', dataController.getDataById);
dataRouter.get('/name/:name', dataController.getDataByName);
dataRouter.post('/', dataController.createData);
dataRouter.patch('/:id', dataController.updateData);
dataRouter.delete('/:id', dataController.deleteData);

export default dataRouter;
```

### Маршрути для Category

```javascript
import { Router } from 'express';
import categoryController from '../controllers/categoryController.js';

const categoryRouter = Router();

categoryRouter.get('/all', categoryController.getCategories);
categoryRouter.get('/:id', categoryController.getCategoryById);
categoryRouter.get('/name/:name', categoryController.getCategoryByName);
categoryRouter.post('/', categoryController.createCategory);
categoryRouter.patch('/:id', categoryController.updateCategory);
categoryRouter.delete('/:id', categoryController.deleteCategory);

export default categoryRouter;
```

### Головний роутер

```javascript
import { Router } from 'express';
import dataRouter from './dataRouter.js';
import categoryRouter from './categoryRouter.js';

const router = Router();

router.use('/data', dataRouter);
router.use('/category', categoryRouter);

export default router;
```

### SQL запити

```javascript
export const dataSQL = {
    findData: 'SELECT * FROM data',
    findDataById: 'SELECT * FROM data WHERE data_id = ?',
    findDataByName: 'SELECT * FROM data WHERE name = ?',
    createData: 'INSERT INTO data (name, description, format, content, createdAt, updatedAt, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    updateDataById: 'UPDATE data SET name = ?, description = ?, format = ?, content = ?, updatedAt = ?, category_id = ? WHERE data_id = ?',
    deleteDataById: 'DELETE FROM data WHERE data_id = ?',
};

export const categorySQL = {
    findCategory: 'SELECT * FROM category',
    findCategoryById: 'SELECT * FROM category WHERE category_id = ?',
    findCategoryByName: 'SELECT * FROM category WHERE name = ?',
    createCategory: 'INSERT INTO category (name) VALUES (?)',
    updateCategoryById: 'UPDATE category SET name = ? WHERE category_id = ?',
    deleteCategoryById: 'DELETE FROM category WHERE category_id = ?',
};
```

### Контролери для Data

```javascript
import pool from '../connection.js';
import { validateData } from '../validation/dataValidation.js';
import { dataSQL } from '../SQL/sql.js';

class dataController {

    async getData(req, res) {

        try {
            const [response] = await pool.query(dataSQL.findData);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getDataById(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(dataSQL.findDataById, [id]);
            
            if(response.length === 0) {
                res.status(404).json({ error: 'Data not found' });
            }

            res.json(response[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getDataByName(req, res) {
        const { name } = req.params;

        try {
            const [response] = await pool.execute(dataSQL.findDataByName, [name]);
            
            if(response.length === 0) {
                res.status(404).json({ error: 'Data not found' });
            }

            res.json(response[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async createData(req, res) {
        const { name, description, format, content, category_id } = req.body;
        const createdAt = new Date();
        const updatedAt = new Date();

        try {
            validateData(req.body);
            const [response] = await pool.execute(dataSQL.createData, [
                name,
                description,
                format,
                content,
                createdAt,
                updatedAt,
                category_id
            ]);

            res.status(201).json({
                message: 'Data created successfully',
                data: {
                    data_id: response.insertId,
                    name,
                    description,
                    format,
                    content,
                    createdAt,
                    updatedAt,
                    category_id
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async updateData(req, res) {
        const { id } = req.params;
        const { name, description, format, content, category_id } = req.body;
        const updatedAt = new Date();

        try {
            validateData(req.body);
            const [response] = await pool.execute(dataSQL.updateDataById, [
                name,
                description,
                format,
                content,
                updatedAt,
                category_id,
                id
            ]);

            if(response.affectedRows === 0) {
                res.status(404).json({ error: 'Data not found' });
            }

            res.json({ message: 'Data updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteData(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(dataSQL.deleteDataById, [id]);

            if(response.affectedRows === 0) {
                res.status(404).json({ error: 'Data not found' });
            }

            res.json({ message: 'Data deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default new dataController();
```

### Контролери для Category

```javascript
import pool from "../connection.js";
import { validateCategory } from "../validation/categoryValidation.js";
import { categorySQL } from "../SQL/sql.js";

class categoryController {

    async getCategories(req, res) {
            
            try {
                const [response] = await pool.query(categorySQL.findCategory);
                res.json(response);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }

    async getCategoryById(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(categorySQL.findCategoryById, [id]);
            
            if(response.length === 0) {
                res.status(404).json({ error: 'Category not found' });
            }

            res.json(response[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCategoryByName(req, res) {
        const { name } = req.params;

        try {
            const [response] = await pool.execute(categorySQL.findCategoryByName, [name]);
            
            if(response.length === 0) {
                res.status(404).json({ error: 'Category not found' });
            }

            res.json(response[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createCategory(req, res) {
        const { name } = req.body;

        try {
            validateCategory(req.body);
            const [response] = await pool.execute(categorySQL.createCategory, [
                name
            ]);
            res.status(201).json({
                message: 'Category created successfully',
                category: {
                    id: response.insertId,
                    name
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCategory(req, res) {
        const { id } = req.params;
        const { name } = req.body;

        try {
            validateCategory(req.body);
            const [response] = await pool.execute(categorySQL.updateCategoryById, [
                name,
                id
            ]);
            
            if(response.affectedRows === 0) {
                res.status(404).json({ error: 'Category not found' });
            }

            res.json({ message: 'Category updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCategory(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(categorySQL.deleteCategoryById, [id]);
            
            if(response.affectedRows === 0) {
                res.status(404).json({ error: 'Category not found' });
            }

            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default new categoryController();
```

### Валідатори

```javascript
export const validateData = ( data ) => {
    const requiredFields = [
        'name',
        'description',
        'format',
        'content',
        'category_id'
    ];

    for (const field of requiredFields) {
        if (!data[field]) {
            throw new Error(`Missing required field: ${ field }`);
        }
    }
};
```

```javascript
export const validateCategory = ( category ) => {
    const { name } = category;

    if (!name) {
        throw new Error('Missing required field: name');
    }
};
```
