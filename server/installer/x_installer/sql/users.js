"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.insert_admin = exports.users_table = void 0;
var crypto_1 = __importDefault(require("crypto"));
var config_1 = require("../../xcore/config");
var DateStr_1 = require("../../xcore/dbase/DateStr");
exports.users_table = {
    sql: "\n    DROP TABLE IF EXISTS users;\n    CREATE TABLE users (\n        id               BIGSERIAL NOT NULL PRIMARY KEY,\n        login            VARCHAR(250) DEFAULT(''),\n        password         VARCHAR(250) DEFAULT(''),\n        family           VARCHAR(150) DEFAULT(''),\n        name             VARCHAR(150) DEFAULT(''),\n        father           VARCHAR(150) DEFAULT(''),\n        telephone        VARCHAR(50) DEFAULT(''),\n        email            VARCHAR(150) DEFAULT(''),\n        org_id           BIGINT DEFAULT(0),\n        job_title_id     BIGINT DEFAULT(0),\n        roles_ids        JSON DEFAULT('{\"roles\":[]}'),\n        user_data        JSON DEFAULT('{\"user_data\":[]}'),\n        mail_code        VARCHAR(250) DEFAULT(''),\n        act_mail         BOOLEAN DEFAULT(false),\n        re_password_code VARCHAR(250) DEFAULT(''),\n        deleted          BOOLEAN DEFAULT(false),\n        deleted_date     TIMESTAMP DEFAULT(null),\n        created_at       TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),\n        info             TEXT DEFAULT('')\n    );\n    \n    COMMENT ON TABLE users IS '\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 \u0441\u0438\u0441\u0442\u0435\u043C\u044B';\n    COMMENT ON COLUMN users.id IS '\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F';\n    COMMENT ON COLUMN users.login IS '\u041B\u043E\u0433\u0438\u043D \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F';\n    COMMENT ON COLUMN users.password IS '\u041F\u0430\u0440\u043E\u043B\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F';\n    COMMENT ON COLUMN users.family IS '\u0424\u0430\u043C\u0438\u043B\u0438\u044F';\n    COMMENT ON COLUMN users.name IS '\u0418\u043C\u044F';\n    COMMENT ON COLUMN users.father IS '\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E';\n    COMMENT ON COLUMN users.telephone IS '\u0422\u0435\u043B\u0435\u0444\u043E\u043D';\n    COMMENT ON COLUMN users.email IS '\u041F\u043E\u0447\u0442\u0430';\n    COMMENT ON COLUMN users.org_id IS '\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0438 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438';\n    COMMENT ON COLUMN users.job_title_id IS '\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0438 \u0434\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u0438 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438';\n    COMMENT ON COLUMN users.roles_ids IS 'json \u043E\u0431\u044A\u0435\u043A\u0442 \u0441 \u043C\u0430\u0441\u0441\u0438\u0432\u043E\u043C \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u0432 \u0440\u043E\u043B\u0435\u0439 \u0434\u043E\u0441\u0442\u0443\u043F\u0430';\n    COMMENT ON COLUMN users.user_data IS 'json \u043E\u0431\u044A\u0443\u043A\u0442 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F';\n    COMMENT ON COLUMN users.mail_code IS '\u043A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0435\u043C\u0430\u0438\u043B';\n    COMMENT ON COLUMN users.act_mail IS '\u0444\u0438\u043A\u0441\u0430\u0446\u0438\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043D\u043E\u0433\u043E \u043A\u043E\u0434\u0430';\n    COMMENT ON COLUMN users.re_password_code IS '\u043A\u043E\u0434 \u0441\u043C\u0435\u043D\u044B \u043F\u0430\u0440\u043E\u043B\u044F \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435';\n    COMMENT ON COLUMN users.deleted IS '\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F';\n    COMMENT ON COLUMN users.deleted_date IS '\u0434\u0430\u0442\u0430 \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F';\n    COMMENT ON COLUMN users.created_at IS '\u0434\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u043F\u0438\u0441\u0438';\n    COMMENT ON COLUMN users.info IS '\u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435';\n    ",
    args: new Array()
};
exports.insert_admin = {
    sql: "INSERT INTO users(login, password, family, name, father, telephone, email, org_id, job_title_id, roles_ids, user_data, mail_code, act_mail, re_password_code, deleted, deleted_date, created_at, info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)",
    args: ['admin', crypto_1["default"].createHmac('sha256', config_1.CONFIG.key_code).update('admin').digest('hex'), 'admin', 'admin', 'admin', '0(000)000-00-00', '', 1, 1, '{"roles":[1,2]}', '{"user_data":[]}', '', false, '', false, null, (0, DateStr_1.dateTimeToSQL)(new Date(Date.now())), '']
};
//# sourceMappingURL=users.js.map