

if (ons.platform.isIPhoneX()) { // Utility function
    // Add empty attribute to the <html> element
    document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
  }

  if (ons.platform.isIPhoneX()) { // Utility function
    // Add empty attribute to the <html> element
    document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
  }
  // Setup Button Handler
  document.addEventListener('init', function(event) {
    var page = event.target;
    if (page.id === 'setup') {
      page.querySelector('#go-to-main').onclick = function() {
        // Store in localStorage
        localStorage.setItem("pub",document.getElementById('pub').value);
        localStorage.setItem("sub",document.getElementById('sub').value);
        // no secret key needed localStorage.setItem("sec",document.getElementById('sec').value);
        document.querySelector('#myNavigator').pushPage('feed.html', {data: {title: 'Auto'}});
      };
    }
    else if (page.id === 'setup-return') {
      page.querySelector('#go-to-main').onclick = function() {
        // Store in localStorage
        localStorage.setItem("pub",document.getElementById('pub').value);
        localStorage.setItem("sub",document.getElementById('sub').value);

        document.querySelector('#myNavigator').pushPage('feed.html', {data: {title: 'Auto'}});
      };
      page.querySelector('#go-cancel').onclick = function() {
        document.querySelector('#myNavigator').pushPage('feed.html', {data: {title: 'Auto'}});
      };
    }
    else if (page.id === 'feed') {
      page.querySelector('#enter-setup').onclick = function() {
        document.querySelector('#myNavigator').pushPage('setup-return.html', {data: {title: 'Auto'}});
      };
    } 
  });
  var shouldIGoToSetup = false;
  // end setup button handler
  if (localStorage.getItem("sub") === null || localStorage.getItem("pub") === null) {
    // hi
    shouldIGoToSetup = true;
    // if this doesn't work, make it set a variable, and use a script tag in feed to launch the page
  }
  else {
    // Do some init stuff
  }      
  function toastThing() {
    
    //myToast.toggle();
    ons.notification.toast('Toast',{timeout: 2000});
  }
  
  function onkitchen(){
    axios.get('http://192.168.1.116:8010/gpio/set', {
        params: {
          pin0:4,
          val0:0
        }
      })
      .then(function (response) {
        console.log(response);
        ons.notification.toast('Sala ligada',{timeout: 2000});
      })
      .catch(function (error) {
        console.log(error);
      })
  } 
  
  function ifgoToSetup() {
    if (shouldIGoToSetup) {
      document.querySelector('#myNavigator').pushPage('setup.html', {data: {title: 'Name'}});
    }
  }

window.fn = {};

window.fn.open = function() {
var menu = document.getElementById('menu');
menu.open();
};

window.fn.load = function(page, data) {
var content = document.getElementById('myNavigator');
var menu = document.getElementById('menu');
content.pushPage(page, data)
.then(menu.close.bind(menu));
};

window.fn.pop = function() {
var content = document.getElementById('myNavigator');
content.popPage();
};