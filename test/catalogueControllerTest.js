/**
 * Created by user on 01/03/17.
 */
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

var app = require('../app');
var async = require('async');

var mongoose = require('mongoose');
//var config = require('../configurations/database');
//mongoose.connect(config.db);

require('../model/account/schemas/user');
require('../model/instances/schemas/workshop-instance.schema');
require('../model/catalogue/schemas/workshop');
var catalogue = require("../model/catalogue/catalogue.js");

var defaultWorkshops;
var workshopToSave;
var isEnvironmentOk = true;

describe('Test catalogue controller ', function(){

    describe('In a populated database ',function () {

        before(function () {
            if(!isEnvironmentOk){
                this.skip();
            }
        });

        beforeEach(function (done) {
            async.each(defaultWorkshops, function (workshop, callback) {
                catalogue.saveWorkshop(workshop).then(function (success) {
                    callback();
                },function (error) {
                    isEnvironmentOk = false;
                    callback("not saved : "+JSON.stringify(error));
                });
            },function (error) {
                if(error) this.skip();
                done();
            });
        });

        afterEach(function () {
            mongoose.model("Workshop").collection.drop();
        });

        it('should get the two workshops', function (done) {
            chai.request(app).get('/api/v1/catalogue').end(function (error, result) {
                if(error){
                    isEnvironmentOk = false;
                    expect.fail();
                } else {
                    var workshopsResult = JSON.parse(result.text).data;
                    expect(workshopsResult).not.to.be.undefined;
                    expect(workshopsResult).to.have.lengthOf(2);
                    workshopsResult.forEach(function (workshopResult) {
                        expect(workshopResult.title).to.be.oneOf(["Paper Plane Factory", "Paper Plane Factory 2"]);
                        expect(workshopResult.duration).to.be.equal(60);
                        expect(workshopResult.content.steps).to.have.lengthOf(11);
                    });
                }
                done();
            });
        });

        it('should get the workshop by id',function(done){
            if(isEnvironmentOk){
                chai.request(app).get('/api/v1/catalogue').end(function (err, res) {
                    if(err){
                        isEnvironmentOk = false;
                        expect.fail();
                        done();
                    } else {
                        var workshop = JSON.parse(res.text).data[0];
                        chai.request(app).get('/api/v1/catalogue/'+workshop._id).end(function (error, result) {
                            var workshopResult = JSON.parse(result.text).data;
                            if(error) expect.fail();
                            else {
                                expect(workshopResult).not.to.be.undefined;
                                expect(JSON.stringify(workshopResult._id)).to.be.equal(JSON.stringify(workshop._id));
                            }
                            done();
                        });
                    }
                });
            } else {
                this.skip();
            }
        });

        it('should saves and then contains the workshop with the title "The Ball Flow Game"', function (done) {
            var workshop = workshopToSave;
            chai.request(app).post('/api/v1/catalogue').send(workshop).end(function (error, result) {
                if(error){
                    isEnvironmentOk = false;
                    expect.fail();
                } else {
                    var workshopResult = JSON.parse(result.text).data;
                    expect(workshopResult).not.to.be.undefined;
                    expect(workshopResult.title).to.equal(workshop.title);
                }
                done();
            });
        });

        it('should delete the specified workshop', function (done) {
            if(isEnvironmentOk){
                chai.request(app).get('/api/v1/catalogue').end(function (err, res) {
                    if(err) {
                        isEnvironmentOk = false;
                        expect.fail();
                        done();
                    } else {
                        var workshop = JSON.parse(res.text).data[0];
                        chai.request(app).delete('/api/v1/catalogue/'+workshop._id).end(function (error, result) {
                            if(error) expect.fail();
                            else {
                                var workshopResult = JSON.parse(result.text).data;
                                expect(workshopResult).not.to.be.undefined;
                                expect(JSON.stringify(workshopResult._id)).to.equal(JSON.stringify(workshop._id));
                                chai.request(app).get('/api/v1/catalogue').end(function (err, newRes) {
                                    if(err) expect.fail();
                                    else {
                                        var newResults = JSON.parse(newRes.text).data;
                                        expect(newResults).to.have.lengthOf(1);
                                    }
                                    done();
                                });
                            }
                        });
                    }
                });
            } else {
                this.skip();
            }
        });
    });
});


defaultWorkshops = [
    {
        "title": "Paper Plane Factory",
        "duration": 60,
        "content": {
            "participants_profil": [],
            "logistics": [],
            "equipment": "<ul><li>Autant d’îlots de tables (2 tables == un site de prod) que d’équipes (6 ou 7 max)</li> <li>Une “piste d’essai” au fond de la salle (tables en long)</li> <li>Un stock de matières premières (brouillons d’examen) sur le devant de la salle</li> <li>Une feuille “plan d’avion” par équipe</li> <li>Un ordi + vidéoprojecteur pour remplir l’excel de suivi et afficher le chrono</li> <li>Quelques feuilles de couleur différentes pour les dernières itérations</li> <li>Balle de parole pour le débrief final</li> <li>Grosses poubelles pour jeter les avions construits</li></ul>",
            "educational_aims": [
                "Travail itératif",
                "Amélioration continue",
                "Prévisions",
                "Rétrospective"
            ],
            "folklore": "L’armée de l’air norvégienne cherche à remplacer un sous-ensemble de sa flotte. Chaque équipe (de 3-4 participants) représente un constructeur aérien, dont l’objectif est de remporter le marché. L’armée achètera auprès du constructeur capable de fabriquer le plus d’avion possible, de la manière la plus prévisible possible.",
            "source": "http://agileway.com.br/2009/11/16/the-airplane-factory-game/ ",
            "steps": [
                {
                    "title": "Intro",
                    "duration": 5,
                    "instructions": "Intructions 1",
                    "description": "Présenter le folklore de l’atelier, les notions travaillées, pourquoi c’est important dans leur projet. Parler du fait que l’atelier est une métaphore, qu’ils retireront de cet atelier ce qu’ils auront investi dedans."
                },
                {
                    "title": "Essai",
                    "duration": 2,
                    "instructions": "Intructions 2",
                    "description": "“Fabrique moi un avion”. Chaque constructeur a 2 minutes pour construire un avion. Éluder les questions posées par les équipes, en insistant sur le fait que c’est eux les constructeurs d’avion."
                },
                {
                    "title": "Debrief",
                    "duration": 5,
                    "instructions": "Intructions 3",
                    "description": "Regarder les avions fabriqués. Rejeter les avions pour des raisons de plus ou moins bonne fois: <ul><li>Est-ce qu’il vole ?</li> <li>Est-ce qu’il a un cockpit pour mettre le pilote ?</li> <li>Est-ce qu’il y a une porte pour faire rentrer les gens ?</li> <li>Est-ce qu’il y a des hublots pour voir dehors ?</li> <li>Est-ce qu’on peut peindre mon logo sur les ailes ?</li> <li>...</li></ul>"
                },
                {
                    "title": "Prototype",
                    "duration": 5,
                    "instructions": null,
                    "description": "<ol><li>Distribuer la spécification de l’avion commandé par l’armée.</li> <li>Laisser 2 minutes pour fabriquer un avion.</li> <li>Une fois fini, laisser une minute pour donner une estimation de combien d’avion pourront être construit en deux minutes.</li> <li>Noter l’estimé dans l’excel de suivi</li></ol>"
                },
                {
                    "title": "Itération 1",
                    "duration": 8,
                    "instructions": "Intructions 5",
                    "description": "Annoncer un jeu de contraintes imprévues: <ul><li>Pas le droit de stocker des matières premières sur le site;</li> <li>Une chaîne de production (pas de construction en parallèle)</li> <li>12 hublots (6 de chaque côté)</li> <li>Un cockpit et au moins une porte</li> <li>Logo de la compagnie sur les ailes</li> <li>L’avion doit supporter un vol d’essai sur la piste</li> <li>On peut garder un avion “incomplet” sur la chaîne d’une itération à l’autre</li></ul> Revoir les estimations. Lancer la phase de construction (2 minutes). Récupérer les nombres d’avion livrés, les noter dans le excel.<br /><br /> Laisser 2 minutes de débriefing interne aux équipes. Ils doivent donner à la fin une nouvelle estimation pour l’itération suivante. Rappeler que le contrat sera remporté par le constructeur qui construit le plus d’avion, mais aussi de la manière la plus prévisible (donc avec les meilleurs estimations). Jeter les avions construits pendant le débriefing (ménage en cours de route).<br /><br /> Les pousser à s’améliorer en donnant le record obtenu (44 avions construits en 5 itérations)"
                },
                {
                    "title": "Itération 2",
                    "duration": 5,
                    "instructions": "Intructions 6",
                    "description": "<ol><li>Phase de construction (2 minutes)</li> <li>Noter le nb de produits livrés</li> <li>Phase de débrief (2 minutes)</li> <li>Noter les estimations</li></ul>"
                },
                {
                    "title": "Itération 3",
                    "duration": 5,
                    "instructions": null,
                    "description": "<ol><li>Phase de construction (2 minutes)</li> <li>Noter le nb de produits livrés</li> <li>Phase de débrief (2 minutes)</li> <li>Noter les estimations</li></ol> <i>Ajouter pendant le débrief quelques feuilles de couleur différentes</i>"
                },
                {
                    "title": "Itération 4",
                    "duration": 5,
                    "instructions": "Intructions 8",
                    "description": "<ol><li>Phase de construction (2 minutes)</li> <li>Noter le nb de produits livrés. Annoncer au choix :</li> <ol type=\"a\"><li>“Les avions de couleurs ≠ ne sont pas conforme”</li> <li>ou “Les avions de couleurs ≠ compte double”</li></ol> <li>Phase de débrief (2 minutes)</li> <li>Noter les estimations</li></ol>"
                },
                {
                    "title": "Itération 5",
                    "duration": 5,
                    "instructions": "Intructions 9",
                    "description": "<ol><li>Phase de construction (2 minutes)</li> <li>Noter le nb de produits livrés</li> <li>Phase de débrief (2 minutes)</li> <li>Noter les estimations</li></ul>"
                },
                {
                    "title": "Debrief",
                    "duration": 10,
                    "instructions": "Intructions 10",
                    "description": "Mettre tous les participants debout en rond dans la salle (où dehors s’il fait beau). Utiliser une balle de parole pour faire circuler la parole dans le groupe. Questions potentielle pour alimenter le débat: <ul><li>Est-ce que la création du prototype a aidée ?</li> <li>Comment ont évolués les estimations des prototypes ?</li> <li>Rôle des rétrospective dans le processus ?</li> <li>Comment avoir vécu les contraintes qui apparaissent ?</li> <li>Sentiment vis à vis des différents cycles ?</li> <li>Rôle dans l’équipe ? Évolution avec les rétrospectives ?</li> <li>Lien avec</li></ul>"
                },
                {
                    "instructions": null,
                    "description": "<center><b>Fin de l’atelier</center></b>"
                }
            ]
        },
        "preparation_time": 30,
        "synopsis": "L’armée de l’air norvégienne cherche à remplacer un sous-ensemble de sa flotte. Chaque équipe (de 3-4 participants) représente un constructeur aérien, dont l’objectif est de remporter le marché. L’armée achètera auprès du constructeur capable de fabriquer le plus d’avion possible, de la manière la plus prévisible possible.",
        "public_targeted": "Tous",
        "participants_min": 3,
        "participants_max": -1,
        "goals": [],
        "workshop_type": "Production",
        "photo": "https://pfe-facilitation.herokuapp.com/img/atelier1.jpg",
        "author": "Sébastien Mosser",
        "nb_time_played": 2
    },
    {
        "title": "Paper Plane Factory 2",
        "duration": 60,
        "content": {
            "participants_profil": [],
            "logistics": [],
            "equipment": "<ul><li>Autant d’îlots de tables (2 tables == un site de prod) que d’équipes (6 ou 7 max)</li> <li>Une “piste d’essai” au fond de la salle (tables en long)</li> <li>Un stock de matières premières (brouillons d’examen) sur le devant de la salle</li> <li>Une feuille “plan d’avion” par équipe</li> <li>Un ordi + vidéoprojecteur pour remplir l’excel de suivi et afficher le chrono</li> <li>Quelques feuilles de couleur différentes pour les dernières itérations</li> <li>Balle de parole pour le débrief final</li> <li>Grosses poubelles pour jeter les avions construits</li></ul>",
            "educational_aims": [
                "Travail itératif",
                "Amélioration continue",
                "Prévisions",
                "Rétrospective"
            ],
            "folklore": "L’armée de l’air norvégienne cherche à remplacer un sous-ensemble de sa flotte. Chaque équipe (de 3-4 participants) représente un constructeur aérien, dont l’objectif est de remporter le marché. L’armée achètera auprès du constructeur capable de fabriquer le plus d’avion possible, de la manière la plus prévisible possible.",
            "source": "http://agileway.com.br/2009/11/16/the-airplane-factory-game/ ",
            "steps": [
                {
                    "title": "Intro",
                    "duration": 5,
                    "instructions": "Intructions 1",
                    "description": "Présenter le folklore de l’atelier, les notions travaillées, pourquoi c’est important dans leur projet. Parler du fait que l’atelier est une métaphore, qu’ils retireront de cet atelier ce qu’ils auront investi dedans."
                },
                {
                    "title": "Essai",
                    "duration": 2,
                    "instructions": "Intructions 2",
                    "description": "“Fabrique moi un avion”. Chaque constructeur a 2 minutes pour construire un avion. Éluder les questions posées par les équipes, en insistant sur le fait que c’est eux les constructeurs d’avion."
                },
                {
                    "title": "Debrief",
                    "duration": 5,
                    "instructions": "Intructions 3",
                    "description": "Regarder les avions fabriqués. Rejeter les avions pour des raisons de plus ou moins bonne fois: <ul><li>Est-ce qu’il vole ?</li> <li>Est-ce qu’il a un cockpit pour mettre le pilote ?</li> <li>Est-ce qu’il y a une porte pour faire rentrer les gens ?</li> <li>Est-ce qu’il y a des hublots pour voir dehors ?</li> <li>Est-ce qu’on peut peindre mon logo sur les ailes ?</li> <li>...</li></ul>"
                },
                {
                    "title": "Prototype",
                    "duration": 5,
                    "instructions": null,
                    "description": "<ol><li>Distribuer la spécification de l’avion commandé par l’armée.</li> <li>Laisser 2 minutes pour fabriquer un avion.</li> <li>Une fois fini, laisser une minute pour donner une estimation de combien d’avion pourront être construit en deux minutes.</li> <li>Noter l’estimé dans l’excel de suivi</li></ol>"
                },
                {
                    "title": "Itération 1",
                    "duration": 8,
                    "instructions": "Intructions 5",
                    "description": "Annoncer un jeu de contraintes imprévues: <ul><li>Pas le droit de stocker des matières premières sur le site;</li> <li>Une chaîne de production (pas de construction en parallèle)</li> <li>12 hublots (6 de chaque côté)</li> <li>Un cockpit et au moins une porte</li> <li>Logo de la compagnie sur les ailes</li> <li>L’avion doit supporter un vol d’essai sur la piste</li> <li>On peut garder un avion “incomplet” sur la chaîne d’une itération à l’autre</li></ul> Revoir les estimations. Lancer la phase de construction (2 minutes). Récupérer les nombres d’avion livrés, les noter dans le excel.<br /><br /> Laisser 2 minutes de débriefing interne aux équipes. Ils doivent donner à la fin une nouvelle estimation pour l’itération suivante. Rappeler que le contrat sera remporté par le constructeur qui construit le plus d’avion, mais aussi de la manière la plus prévisible (donc avec les meilleurs estimations). Jeter les avions construits pendant le débriefing (ménage en cours de route).<br /><br /> Les pousser à s’améliorer en donnant le record obtenu (44 avions construits en 5 itérations)"
                },
                {
                    "title": "Itération 2",
                    "duration": 5,
                    "instructions": "Intructions 6",
                    "description": "<ol><li>Phase de construction (2 minutes)</li> <li>Noter le nb de produits livrés</li> <li>Phase de débrief (2 minutes)</li> <li>Noter les estimations</li></ul>"
                },
                {
                    "title": "Itération 3",
                    "duration": 5,
                    "instructions": null,
                    "description": "<ol><li>Phase de construction (2 minutes)</li> <li>Noter le nb de produits livrés</li> <li>Phase de débrief (2 minutes)</li> <li>Noter les estimations</li></ol> <i>Ajouter pendant le débrief quelques feuilles de couleur différentes</i>"
                },
                {
                    "title": "Itération 4",
                    "duration": 5,
                    "instructions": "Intructions 8",
                    "description": "<ol><li>Phase de construction (2 minutes)</li> <li>Noter le nb de produits livrés. Annoncer au choix :</li> <ol type=\"a\"><li>“Les avions de couleurs ≠ ne sont pas conforme”</li> <li>ou “Les avions de couleurs ≠ compte double”</li></ol> <li>Phase de débrief (2 minutes)</li> <li>Noter les estimations</li></ol>"
                },
                {
                    "title": "Itération 5",
                    "duration": 5,
                    "instructions": "Intructions 9",
                    "description": "<ol><li>Phase de construction (2 minutes)</li> <li>Noter le nb de produits livrés</li> <li>Phase de débrief (2 minutes)</li> <li>Noter les estimations</li></ul>"
                },
                {
                    "title": "Debrief",
                    "duration": 10,
                    "instructions": "Intructions 10",
                    "description": "Mettre tous les participants debout en rond dans la salle (où dehors s’il fait beau). Utiliser une balle de parole pour faire circuler la parole dans le groupe. Questions potentielle pour alimenter le débat: <ul><li>Est-ce que la création du prototype a aidée ?</li> <li>Comment ont évolués les estimations des prototypes ?</li> <li>Rôle des rétrospective dans le processus ?</li> <li>Comment avoir vécu les contraintes qui apparaissent ?</li> <li>Sentiment vis à vis des différents cycles ?</li> <li>Rôle dans l’équipe ? Évolution avec les rétrospectives ?</li> <li>Lien avec</li></ul>"
                },
                {
                    "instructions": null,
                    "description": "<center><b>Fin de l’atelier</center></b>"
                }
            ]
        },
        "preparation_time": 30,
        "synopsis": "L’armée de l’air norvégienne cherche à remplacer un sous-ensemble de sa flotte. Chaque équipe (de 3-4 participants) représente un constructeur aérien, dont l’objectif est de remporter le marché. L’armée achètera auprès du constructeur capable de fabriquer le plus d’avion possible, de la manière la plus prévisible possible.",
        "public_targeted": "Tous",
        "participants_min": 3,
        "participants_max": -1,
        "goals": [],
        "workshop_type": "Production",
        "photo": "https://pfe-facilitation.herokuapp.com/img/atelier1.jpg",
        "author": "Sébastien Mosser",
        "nb_time_played": 2
    }
];

workshopToSave = {
    "title":"The Ball Flow Game",
    "duration":60,
    "content":{
        "participants_profil":[
        ],
        "logistics":[
        ],
        "equipment":"<ul><li>Salle vide (en tout cas avec de la place)</li> <li>~16 participants par atelier</li> <li>20 balles de ping pong par groupe</li> <li>Quelques balles exotiques (golf, mini-ballon de basket, boule de pétanque)</li> <li>Un bac pour stocker les balles une fois enchantées</li> <li>un ordinateur portable avec le fichier excel de suivi (macros activées)</li> <ul><li>Ctrl-B: démarre le chrono du round courant</li> <li>Ctrl-I: capture l’entrée d’une balle dans l’équipe</li> <li>Ctrl-O: capture la sortie d’une balle de l’équipe</li> <li>Ctrl-E: arrête le chrono du round courant</li></ul></ul>",
        "educational_aims":[
            "Amélioration continue",
            "TaF - WiP",
            "Lead time vs Throughput"
        ],
        "folklore":"Les participants sont des mages, qui doivent enchanter des balles avant qu’elles ne soient vendue sur le chemin de traverse. <b>On doit fabriquer des lots de 20 balles.</b> Pour enchanter une balle, il suffit que chaque mage de l’équipe lui apporte un peu de sa magie, en la touchant. Mais la magie est régi par des règles immuables: <ul><li>si deux mages touchent la balle en même temps, elle perd tout enchantement;</li> <li>si deux mages côte à côte se passent une balle directement, leurs champs électro-magnético-magiques s’annulent et la balle est immédiatement désenchantée, il faut recommencer tout le processus;</li> <li>Pour entrer et sortir du processus d’enchantement, un elfe donne la balle au premier mage et la récupère après que le dernier l’ait enchanté. </li></ul><b>L’objectif n’est pas de traiter le plus de balles possible dans un temps donné, mais bien de traiter des lots de 20 balles. C’est le temps de traitement d’une balle qui nous intéresse, pas le temps de traitement du lot.</b>",
        "source":"http://availagility.co.uk/2011/07/19/running-the-ball-flow-game/",
        "steps":[
            {
                "title":"Intro",
                "duration":5,
                "instructions":null,
                "description":"Présenter le folklore de l’atelier, les notions travaillées, pourquoi c’est important dans leur projet. Parler du fait que l’atelier est une métaphore, qu’ils retireront de cet atelier ce qu’ils auront investi dedans."
            },
            {
                "title":"Round #1",
                "duration":10,
                "instructions":null,
                "description":"<ul><li>Laisser l’équipe s’auto-organiser (2 minutes)</li> <li>Lancer le chrono du round dans le fichier Excel</li> <li>Donner les balles une par une au participant jouant l’elfe</li> <ul><li>Celui-ci dit “IN” quand il envoi une balle dans le flow</li> <li>Il dit “OUT” quand il ressort une balle du flow</li></ul> <li>Quand les 20 balles sont passées, on arrête le chrono</li> <li>Regarder les métriques (lead time et cumulative flow) avec le groupe.</li></ul>"
            },
            {
                "title":"Round #2",
                "duration":8,
                "instructions":null,
                "description":"<ul><li>Laisser quelques minutes pour s’auto-organiser. Identifier les hypothèses faite pour s’améliorer, et l’effet attendu sur les métriques</li> <li>Rejouer le round comme précédemment</li></ul>"
            },
            {
                "title":"Round #3",
                "duration":8,
                "instructions":null,
                "description":"<ul><li>Laisser quelques minutes pour s’auto-organiser. Identifier les hypothèses faite pour s’améliorer, et l’effet attendu sur les métriques</li> <li>Rejouer le round</li> <ul><li>Utiliser des balles exotiques au lieu de certaines balles utilisées classiquement. Des balles de golfs (qui ressemblent aux balles de ping pong).</li></ul></ul>"
            },
            {
                "title":"Round #4",
                "duration":8,
                "instructions":null,
                "description":"<ul><li>Laisser quelques minutes pour s’auto-organiser. Identifier les hypothèses faite pour s’améliorer, et l’effet attendu sur les métriques</li> <li>Rejouer le round</li> <ul><li>Utiliser des mini-ballons pour représenter des demandes urgentes du client.</li></ul></ul>"
            },
            {
                "instructions":null,
                "description":"<center><b>Si le temps le permet ajouter une 5ème itération (ça dépend des équipes)</b></center>"
            },
            {
                "title":"Débrief",
                "duration":15,
                "instructions":null,
                "description":"<ul><li>Quel lien avec un vrai projet de développement ?</li> <li>Changement de type de balle ?</li> <li>Lean time contre iteration time ? Comment limiter le WiP ?</li> <li>Intégration des demandes urgente du client dans le dèv ?</li> <li>Amélioration continue sur les itérations ?</li> <li>Lien entre balle et tâche ?</li> <li>Lot et itération ?</li></ul>"
            },
            {
                "instructions":null,
                "description":"<center><b>Fin de l’atelier</b></center>"
            }
        ]
    },
    "preparation_time":30,
    "synopsis":"Les participants sont des mages, qui doivent enchanter des balles avant qu’elles ne soient vendue sur le chemin de traverse. On doit fabriquer des lots de 20 balles. Pour enchanter une balle, il suffit que chaque mage de l’équipe lui apporte un peu de sa magie, en la touchant.",
    "public_targeted":"Tous",
    "participants_min":3,
    "participants_max":-1,
    "goals":[
    ],
    "workshop_type":"Production",
    "photo":"https://pfe-facilitation.herokuapp.com/img/atelier2.jpg",
    "author":"Sébastien Mosser",
    "nb_time_played":3
};