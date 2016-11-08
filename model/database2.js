/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  07/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/

var catalogue = {
    getWorkshops: getWorkshopsFunc
};

var workshops = [
    {
        title: "Paperplanes",
        description: "Atelier avec des avions en papiers",
        equipments: [
            "papier", "stylos"
        ],
        max_participants: "-1",
        min_participants: "12",
        iterations: [
            {
                description: "iteration #1",
                timer: "180",
                naration: "Il était une fois ..."
            }
        ]
    },
    {
        title: "Legos prehistoire",
        description: "Construction de legos respectant des specs. Chaque spec à une valeur pour le client et sont plus ou moins dures à remplir",
        equipments: [
            "legos avec au minimum 4 couleurs pour de la difficulté", "cartes : http://www.trucbiduledecartes.fr"
        ],
        max_participants: "-1",
        min_participants: "12",
        iterations: [
            {
                titre: "iteration #1",
                timer: "240",
                naration: "Il était une fois ..."
            },
            {
                titre: "iteration #2",
                timer: "180",
                naration: " ... ",
                changes : "Rajouter des cartes"
            }
        ]
    }
];

function getWorkshopsFunc() {
    return workshops;
}