// helper functions
function formatNumber(x) {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
}


// get the data from the google spreadhsheet
// Url is defined on each index.html page
// var publicSpreadsheetUrl = '';
function init() {
  Tabletop.init( { key: publicSpreadsheetUrl, callback: vizIt } )
}
function vizIt(data, tabletop) {
  
  var pageData = data.overview.elements;
  
  $('#overview-text').text(findObjectByKey(pageData, "key", "overview-text").value)
  var keyTarget = findObjectByKey(pageData, "key", "key-target")
  $('#key-target').text(formatNumber(keyTarget.value))
  $('#key-target-label').html(keyTarget.label)
  var keyMoney1 = findObjectByKey(pageData, "key", "key-money1")
  $('#key-money1').text(formatNumber(keyMoney1.value))
  $('#key-money1-label').html(keyMoney1.label)
  var keyMoney2 = findObjectByKey(pageData, "key", "key-money2")
  $('#key-money2').text(formatNumber(keyMoney2.value))
  $('#key-money2-label').html(keyMoney2.label)
  
  for(i = 0; i < pageData.length; i++) {
    if(pageData[i].key == "secondary-figure") {
      var figureHtml = '<div class="col-xs-3">' +
          '<img class="pull-left" src="../img/secondary-icons/' + pageData[i].img + '" height="60px">' +
          '<div><span class="secondary-figure_number">' + pageData[i].value + '</span><br>' +
            '<span class="secondary-figure_name">' + pageData[i].label + '</span>' +
          '</div>' +
        '</div>';
      $('#secondary-figures').append(figureHtml);    
    }
  }
  
  $('#figure-sources').html(findObjectByKey(pageData, "key", "sources").label)
  
}

// kick everything off
init()
