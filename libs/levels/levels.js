var levels = [
    {
        nodes: 8,
        edges: 20,
        startPoint: hotels[0],
        endPoint: shops[2],
        nodeRates: [
            {
                type: shops[0]
            },
            {
                type: shops[1]
            },
            {
                type: [treasures[0], treasures[1]],
                rate: [80, 20]
            },
            {
                type: [hotels[1]],
                rate: [40]
            },
            {
                type: hotels[2]
            }
        ],
        edgeRates: [
            {
                rate: 50,
                type: monsters[0]
            },
            {
                rate: 30,
                type: monsters[1]
            },
            {
                rate: 10,
                type: monsters[2]
            },
            {
                rate: 10,
                type: monsters[3]
            }
        ]
    },
    {
        nodes: 12,
        edges: 36,
        startPoint: hotels[1],
        endPoint: shops[5],
        nodeRates: [
            {
                type: shops[0]
            },
            {
                type: shops[1]
            },
            {
                type: [treasures[0], treasures[1]],
                rate: [60, 40]
            },
            {
                type: treasures[1]
            },
            {
                type: hotels[2]
            },
            {
                type: hotels[3]
            },
            {
                type: hotels[4]
            }
        ],
        edgeRates: [{
            rate: 10,
            type: monsters[1]
        }, {
            rate: 10,
            type: monsters[2]
        }, {
            rate: 40,
            type: monsters[3]
        }, {
            rate: 20,
            type: monsters[4]
        }, {
            rate: 20,
            type: monsters[5]
        }]
    },
    {
        nodes: 15,
        edges: 50,
        startPoint: hotels[1],
        endPoint: shops[2],
        nodeRates: [
            {
                type: shops[0]
            },
            {
                type: shops[1]
            },
            {
                type: shops[5]
            },
            {
                type: treasures[1]
            },
            {
                type: treasures[2]
            },
            {
                type: [treasures[3]],
                rate: [10]
            },
            {
                type: [hotels[2], hotels[4]],
                rate: [70, 30]
            },
            {
                type: hotels[3]
            }
        ],
        edgeRates: [{
            rate: 20,
            type: monsters[4]
        }, {
            rate: 40,
            type: monsters[5]
        }, {
            rate: 30,
            type: monsters[6]
        }, {
            rate: 10,
            type: monsters[7]
        }]
    },
    {
        nodes: 20,
        edges: 75,
        startPoint: hotels[5],
        endPoint: shops[8],
        nodeRates: [
            {
                type: shops[6]
            },
            {
                type: shops[6]
            },
            {
                type: shops[6]
            },
            {
                type: shops[7]
            },
            {
                type: shops[7]
            },
            {
                type: shops[7]
            },
            {
                type: shops[8]
            },
            {
                type: shops[8]
            },
            {
                type: treasures[4]
            },
            {
                type: treasures[4]
            },
            {
                type: treasures[4]
            },
            {
                type: treasures[4]
            },
            {
                type: treasures[4]
            },
            {
                type: hotels[6]
            },
            {
                type: hotels[6]
            },
            {
                type: hotels[6]
            }
        ],
        edgeRates: [{
            rate: 30,
            type: monsters[8]
        }, {
            rate: 30,
            type: monsters[9]
        }, {
            rate: 20,
            type: monsters[10]
        }, {
            rate: 20,
            type: monsters[11]
        }]
    }
];