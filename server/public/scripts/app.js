$(document).ready(function() {
  var currentMu = 0;

  $.ajax({
    type: 'GET',
    url: '/data',
    success: function(data) {

      //Append index points for each element in data.mu
      $.each(data.mu, function(i, muMembers) {
        $('.index-points').append('<div class="point" data-id=' + i + '></div>');
      })

      //Call functions for specific mu info
      next();
      prev();
      highlight();
      addInfo();


      setInterval(autoNext, 5000);

      // Auto advance to next element in data.mu
      function autoNext() {
        currentMu++;
        cycleThru();
        addInfo();
        highlight();
      }

      //Highlight current index point
      function highlight() {
        $('.highlight').removeClass('highlight');
        $('.point').eq(currentMu).addClass('highlight');
      }

  
      //Advance to next element in data.mu
      function next() {
        $('.next').on('click', function() {
          $('body').find('.person-container').empty();
          currentMu++;
          cycleThru();
          addInfo();
          highlight();
        });
      }

      //Return to previous element in muList
      function prev() {
        $('.prev').on('click', function() {
          $('body').find('.person-container').empty();
          currentMu--;
          cycleThru();
          addInfo();
          highlight();
        });
      }

      //Check if currentMu is within the data indices
      function cycleThru() {
        if (currentMu > data.mu.length - 1) {
          currentMu = 0;
        } else if (currentMu < 0) {
          currentMu = data.mu.length - 1;
        }
      }

      //Append currenMu info to the DOM;
      function addInfo() {
        var $el = $('.person-container');
        var mccm = data.mu[currentMu];
        $('.person-container').fadeOut("slow", function() {
          $('.person-container').children().remove();
          $el.append('<h2>' + mccm.name + '</h2>');
          $el.append('<p>'+'Github username: ' + mccm.git_username + '</p>');
          $el.append('<p>'+'Shoutout: ' + mccm.shoutout + '</p>');
          $('.person-container').fadeIn("slow");
        });
      }
    }
  })
});
