/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`src/parser/parse-with-sourcemap.test.ts TAP > must match snapshot 1`] = `
Object {
  "jsonLike": Object {
    "example": Object {
      "token": "11111111",
      "user": Object {
        "name": "Homer",
      },
    },
    "properties": Object {
      "token": Object {
        "type": "string",
      },
      "user": Object {
        "example": Object {
          "name": "Homer",
        },
        "properties": Object {
          "name": Object {
            "type": "string",
          },
        },
        "required": Array [
          "name",
        ],
        "type": "object",
      },
    },
    "required": Array [
      "user",
      "token",
    ],
    "type": "object",
  },
  "sourcemap": Object {
    "files": Array [
      Object {
        "index": 0,
        "path": "/Users/dev/work/poc-typescript4-node16-yarn2-tap-boilerplate/projects/openapi-utilities/inputs/openapi3-with-references/external-multiple.yaml",
      },
      Object {
        "index": 1,
        "path": "/Users/dev/work/poc-typescript4-node16-yarn2-tap-boilerplate/projects/openapi-utilities/inputs/openapi3-with-references/definitions.yaml",
      },
    ],
    "map": Array [
      Array [
        "#",
        Object {
          "file": 0,
          "node": Array [
            0,
            198,
          ],
        },
      ],
      Array [
        "#/type",
        Object {
          "file": 0,
          "key": Array [
            0,
            4,
          ],
          "node": Array [
            0,
            12,
          ],
          "value": Array [
            6,
            12,
          ],
        },
      ],
      Array [
        "#/required",
        Object {
          "file": 0,
          "key": Array [
            13,
            21,
          ],
          "node": Array [
            13,
            36,
          ],
          "value": Array [
            23,
            36,
          ],
        },
      ],
      Array [
        "#/required/0",
        Object {
          "file": 0,
          "node": Array [
            24,
            28,
          ],
        },
      ],
      Array [
        "#/required/1",
        Object {
          "file": 0,
          "node": Array [
            30,
            35,
          ],
        },
      ],
      Array [
        "#/properties",
        Object {
          "file": 0,
          "key": Array [
            37,
            47,
          ],
          "node": Array [
            37,
            117,
          ],
          "value": Array [
            51,
            117,
          ],
        },
      ],
      Array [
        "#/properties/token",
        Object {
          "file": 0,
          "key": Array [
            51,
            56,
          ],
          "node": Array [
            51,
            74,
          ],
          "value": Array [
            62,
            74,
          ],
        },
      ],
      Array [
        "#/properties/token/type",
        Object {
          "file": 0,
          "key": Array [
            62,
            66,
          ],
          "node": Array [
            62,
            74,
          ],
          "value": Array [
            68,
            74,
          ],
        },
      ],
      Array [
        "#/properties/user",
        Object {
          "file": 1,
          "key": Array [
            0,
            4,
          ],
          "node": Array [
            0,
            111,
          ],
          "value": Array [
            8,
            111,
          ],
        },
      ],
      Array [
        "#/properties/user/type",
        Object {
          "file": 1,
          "key": Array [
            8,
            12,
          ],
          "node": Array [
            8,
            20,
          ],
          "value": Array [
            14,
            20,
          ],
        },
      ],
      Array [
        "#/properties/user/required",
        Object {
          "file": 1,
          "key": Array [
            23,
            31,
          ],
          "node": Array [
            23,
            39,
          ],
          "value": Array [
            33,
            39,
          ],
        },
      ],
      Array [
        "#/properties/user/required/0",
        Object {
          "file": 1,
          "node": Array [
            34,
            38,
          ],
        },
      ],
      Array [
        "#/properties/user/properties",
        Object {
          "file": 1,
          "key": Array [
            42,
            52,
          ],
          "node": Array [
            42,
            82,
          ],
          "value": Array [
            58,
            82,
          ],
        },
      ],
      Array [
        "#/properties/user/properties/name",
        Object {
          "file": 1,
          "key": Array [
            58,
            62,
          ],
          "node": Array [
            58,
            82,
          ],
          "value": Array [
            70,
            82,
          ],
        },
      ],
      Array [
        "#/properties/user/properties/name/type",
        Object {
          "file": 1,
          "key": Array [
            70,
            74,
          ],
          "node": Array [
            70,
            82,
          ],
          "value": Array [
            76,
            82,
          ],
        },
      ],
      Array [
        "#/properties/user/example",
        Object {
          "file": 1,
          "key": Array [
            85,
            92,
          ],
          "node": Array [
            85,
            111,
          ],
          "value": Array [
            98,
            111,
          ],
        },
      ],
      Array [
        "#/properties/user/example/name",
        Object {
          "file": 1,
          "key": Array [
            98,
            102,
          ],
          "node": Array [
            98,
            111,
          ],
          "value": Array [
            104,
            111,
          ],
        },
      ],
      Array [
        "#/example",
        Object {
          "file": 0,
          "key": Array [
            118,
            125,
          ],
          "node": Array [
            118,
            197,
          ],
          "value": Array [
            129,
            197,
          ],
        },
      ],
      Array [
        "#/example/token",
        Object {
          "file": 0,
          "key": Array [
            129,
            134,
          ],
          "node": Array [
            129,
            146,
          ],
          "value": Array [
            136,
            146,
          ],
        },
      ],
      Array [
        "#/example/user",
        Object {
          "file": 1,
          "key": Array [
            85,
            92,
          ],
          "node": Array [
            85,
            111,
          ],
          "value": Array [
            98,
            111,
          ],
        },
      ],
    ],
  },
}
`