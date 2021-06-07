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
                type: shops[2]
            },
            {
                type: shops[3]
            },
            {
                type: shops[4]
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
            rate: 20,
            type: monsters[2]
        }, {
            rate: 30,
            type: monsters[3]
        }, {
            rate: 30,
            type: monsters[4]
        }, {
            rate: 10,
            type: monsters[5]
        }]
    }
];