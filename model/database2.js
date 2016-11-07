/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  07/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/

var database = {
    getWorkshops: getWorkshopsFunc
};

function getWorkshopsFunc() {
    var result = [{
        title: "Paperplanes",
        description: "Atelier avec des avions en papiers",
        max_participants: "-1",
        min_participants: "12",
        iterations: [
            {
                description: "iteration #1",
                timer: "180",
                naration: "Il était une fois ..."
            }
        ]
    }];

    return result;
}