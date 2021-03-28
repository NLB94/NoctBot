const { readdirSync } = require("fs");
const { client } = require("../../..");

const categories = readdirSync('./Bot/commands');

$('.categories li').on('click', setCategory);

function setCategory() {
  blank();

  const selected = $(this);
  selected.addClass('active');  
  
  updateResultsText(categories);
}
function blank() {
  $('.categories li').removeClass('active');
  $('.commands li').hide();
}

$('#search + button').on('click', () => {
  const query = $('#search input').val();
  if (!query.trim()) {
    updateResultsText(commands);
    return $('.commands li').show();
  }

  const commands = client.commands;

  blank(); 
  
  for (const command of commands)
    $(`#${command.name}Command`).show();

  updateResultsText(commands);
});

function updateResultsText(arr) {  
  $('#commandError').text(
    (arr.length <= 0)
    ? 'There is nothing to see here.'
    : '');
}

setCategory.bind($('.categories li')[0])();