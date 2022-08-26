// creating an array to populate conventional time respresnetations in boxes on left side
var timeConv = ['9AM','10AM','11AM','12AM','1PM','2PM','3PM','4PM','5PM'];
var dayEl = $('#currentDay');
// the next two lines add the current date in the necessary format tot he lower part of the jumbotron
var today = moment();
dayEl.text(today.format("dddd, MMMM Do"));
// creating the boxes on page inception, the formatting is rough
for (var i = 0; i <= 8; i++) {
    // collecting necessary hour info
    var currentTime = moment().format('H');
    // rendering the elements
    var parentEl = $('<div class = "row mb-1 time-block" data-id ="' + i + '">');
    var idEl = $('<div class = "col-1 hour py-4">' + timeConv[i] + '</div>');
    var textEl = $('<textarea class = "col-10 description">');
    var btnEl = $('<buttin class = "col-1 saveBtn py-4"><i class="fas fa-save"></i></button>');
    parentEl.append(idEl, textEl, btnEl);
    $('.container').append(parentEl);
    // adding the color schema for past, present, future
    if ((currentTime - 9) === i) {
        textEl.addClass('present');
    }if ((currentTime - 9) > i) {
        textEl.addClass('past');
    }if ((currentTime - 9) < i) {
        textEl.addClass('future');
    }
}
// event lisenter for the save button so that entries are saved in local storage
$('.container').on('click', '.saveBtn', function() {
    var eventID = $(this).parent().attr('data-id');
    var eventDescription = $(this).prev().val();
    localStorage.setItem(eventID, eventDescription);
});
// repopulating the list from local storage using the .each method
$('.description').each(function() {
    var eventID = $(this).parent().attr('data-id');
    var eventDescription = localStorage.getItem(eventID);
    $(this).val(eventDescription);
});
