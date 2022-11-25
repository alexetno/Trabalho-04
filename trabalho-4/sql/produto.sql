{
    "type": "database",
    "name": "produto",
    "objects": [
        {
            "type": "table",
            "database": null,
            "name": "produto",
            "withoutRowId": true,
            "ddl": "CREATE TABLE produto(\n\n    codigo      INTEGER PRIMARY KEY AUTOINCREMENT,\n    descricao   TEXT,\n    preco       NUMERIC,\n    quantidade  INTEGER \n)",
            "columns": [
                {
                    "name": "codigo",
                    "type": "INTEGER",
                    "constraints": [
                        {
                            "type": "PRIMARY KEY",
                            "definition": "PRIMARY KEY AUTOINCREMENT"
                        }
                    ]
                },
                {
                    "name": "descricao",
                    "type": "TEXT"
                },
                {
                    "name": "preco",
                    "type": "NUMERIC"
                },
                {
                    "name": "quantidade",
                    "type": "INTEGER"
                }
            ],
            "rows": [
            ]
        }
    ]
}