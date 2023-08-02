"use strict";
exports.__esModule = true;
exports.dev_povs_table = void 0;
exports.dev_povs_table = {
    sql: "\n    DROP TABLE IF EXISTS dev_povs;\n    CREATE TABLE dev_povs \n    (\n        id BIGSERIAL NOT NULL PRIMARY KEY,\n        dev_id BIGSERIAL NOT NULL,\n        dev_number VARCHAR(80) NOT NULL DEFAULT(''),\n        start_povs TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),\n        end_povs TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),\n        old_dev_povs BIGSERIAL NOT NULL\n    );\n    COMMENT ON TABLE dev_povs IS '\u041F\u043E\u0432\u0435\u0440\u043A\u0430 \u043A\u043E\u0441';\n    COMMENT ON COLUMN dev_povs.id IS '\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u043F\u043E\u0432\u0435\u0440\u043A\u0438';\n    COMMENT ON COLUMN dev_povs.dev_id IS '\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430';\n    COMMENT ON COLUMN dev_povs.dev_number IS '\u041D\u043E\u043C\u0435\u0440 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430';\n    COMMENT ON COLUMN dev_povs.start_povs IS '\u041D\u0430\u0447\u0430\u043B\u043E \u043F\u043E\u0432\u0435\u0440\u043A\u0438';\n    COMMENT ON COLUMN dev_povs.end_povs IS '\u041E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435 \u043F\u043E\u0432\u0435\u0440\u043A\u0438';\n    COMMENT ON COLUMN dev_povs.old_dev_povs IS '\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0441\u0442\u0430\u0440\u043E\u0439 \u043F\u043E\u0432\u0435\u0440\u043A\u0438'; --\u0431\u0435\u0440\u0435\u0442\u0441\u044F id \u0438\u0437 \u044D\u0442\u043E\u0439 \u0431\u0430\u0437\u044B \n    ",
    args: new Array()
};
//# sourceMappingURL=dev_povs.js.map