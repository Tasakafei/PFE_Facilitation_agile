/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/02/17                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
angular.module('facilitation').controller('calendarCtrl', function (EventsService, $scope, $compile, uiCalendarConfig) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.newEvent = {};
    $scope.workshopEvents= [];
    $scope.events = {
        color: 'red',
        events: []
    };
    /** Récupération des événements **/
    EventsService.getEvents()
        .success(function(events) {
            events.data.forEach(function (event) {
                var end = new Date(event.begin_at);
                end.setMinutes(end.getMinutes() + event.duration);
                var color;
                if (event.workshopId) {
                    color = "green";
                }
                $scope.workshopEvents.push({_id: event._id, title: "["+event.group+"]"+event.title, start: new Date(event.begin_at), end: end, color: color, duration: event.duration});
            });
        });

    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
    };

    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
        var elem = {begin_at: event.start._d};
        EventsService.updateWorkshopInstance(event._id,elem);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
        var newDuration = event.duration + delta/60000;
        var elem = {duration: newDuration};
        event.duration = newDuration;
        EventsService.updateWorkshopInstance(event._id,elem);
    };

    $scope.addEvent = function(event) {
        $scope.events.events.push(event);
    };
    /* remove event */
    $scope.remove = function(index) {
        $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
        if(uiCalendarConfig.calendars[calendar]){
            uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
    };

    /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
            'tooltip-append-to-body': true});
        $compile(element)($scope);
    };

    /** When you click on an empty space **/
    $scope.addNewEvent = function (date) {
        $scope.newEvent = {};
        var tmp = date._d;
        $scope.newEvent.hours_begin_at = ""+(tmp.getHours()-1)+":"+tmp.getMinutes();
        $scope.newEvent.begin_at = tmp;
        $('#newEventModal').modal('show');
    };

    $scope.validateEvent = function () {
        var begin = $scope.newEvent.hours_begin_at.split(":");
        $scope.newEvent.begin_at.setHours(begin[0]);
        $scope.newEvent.begin_at.setMinutes(begin[1]);
        var end =$scope.newEvent.hours_end_at.split(":");
        var duration = (parseInt(end[0],10) * 60 + parseInt(end[1],10)) - (parseInt(begin[0],10)*60 +parseInt(begin[1],10));
        var event = {
            title: $scope.newEvent.title,
            description: $scope.newEvent.description,
            duration: duration,
            begin_at: $scope.newEvent.begin_at
        };
        var end_at_date = new Date(event.begin_at);
        end_at_date.setMinutes(end_at_date.getMinutes() + event.duration);
        EventsService.addEvent(event);
        $scope.addEvent({title: event.title, start: event.begin_at, end: end_at_date});
        $('#newEventModal').modal('hide');
        $scope.newEvent = {};
    };
    /* config object */
    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header:{
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender,
            dayClick: $scope.addNewEvent
        }
    };
    $scope.eventSources = [$scope.events, $scope.workshopEvents];
});
