

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
        //localStorage.setItem("ip",document.getElementById('ip').value);
        //localStorage.setItem("sub",document.getElementById('sub').value);
        // no secret key needed localStorage.setItem("sec",document.getElementById('sec').value);
        setIP(document.getElementById('ip').value);
        getFunc();
        document.querySelector('#myNavigator').pushPage('index.html', {data: {title: 'Auto'}});
      };
    }
    else if (page.id === 'setup-return') {
      page.querySelector('#go-to-main').onclick = function() {
        // Store in localStorage
        //localStorage.setItem("ip",document.getElementById('ip').value);
        //localStorage.setItem("sub",document.getElementById('sub').value);
        setIP(document.getElementById('ip').value);
        getFunc();
        document.querySelector('#myNavigator').pushPage('index.html', {data: {title: 'Auto'}});
      };
      page.querySelector('#go-cancel').onclick = function() {
        document.querySelector('#myNavigator').pushPage('index.html', {data: {title: 'Auto'}});
      };
    }
    else if (page.id === 'index') {
    
      if (localStorage.getItem("ip") === null) {
        //document.querySelector('#myNavigator').pushPage('setup.html', {data: {title: 'Auto'}});
        document.querySelector('#myNavigator').pushPage('setup.html', {data: {title: 'Setup'}});
      }else{
        getFunc(); 
      }
      
    } 
    
  });
        
  
  function setIP(ip){
    localStorage.setItem("ip","http://"+ip)
    ons.notification.toast("IP definido",{timeout:15000})
  }
  function getFunc(){
    axios.get(localStorage.getItem("ip")+'/gpio/list')
      .then(function (response) {
        
        for (i in response.data) {
           if(response.data[i].pin == 4){
              if(response.data[i].status == 0){
               
              localStorage.setItem("cozinha", "off");
              document.getElementById('cozinha').checked=false
              
             }else{
              localStorage.setItem("cozinha", "on");       
              document.getElementById('cozinha').checked=true
             }
           
           }       
           if(response.data[i].pin == 17){
            if(response.data[i].status == 0){
             
            localStorage.setItem("sala", "off");
            document.getElementById('sala').checked=false
            
           }else{
            localStorage.setItem("sala", "on");       
            document.getElementById('sala').checked=true
           }
         
         }       
        }
        
      })
      .catch(function (error) {
        console.log(error);
        ons.notification.toast('Erro ao acessar dispositivo',{timeout: 1500});
      })
  }
  function onkitchen(){
    if(localStorage.getItem("cozinha")=="off"){
      axios.get(localStorage.getItem("ip")+'/gpio/set', {
        params: {
          pin0:4,
          val0:1
        }
      })
      .then(function (response) {
        console.log(response);
        //localStorage.setItem("cozinha", "off");
        getFunc();
        ons.notification.toast('Cozinha desligada',{timeout: 1500});
      })
      .catch(function (error) {
        console.log(error);
        ons.notification.toast('Erro ao desligar Cozinha',{timeout: 1500});
      })
    }
    if(localStorage.getItem("cozinha")=="on"){
    axios.get(localStorage.getItem("ip")+'/gpio/set', {
        params: {
          pin0:4,
          val0:0
        }
      })
      .then(function (response) {
        console.log(response);
        //localStorage.setItem("cozinha", "on");
        getFunc();
        ons.notification.toast('Cozinha ligada',{timeout: 1500});
      })
      .catch(function (error) {
        console.log(error);
        
        ons.notification.toast(error,{timeout: 1500});
      })
    }
  }
  function onliving(){
    if(localStorage.getItem("sala")=="off"){
      axios.get(localStorage.getItem("ip")+'/gpio/set', {
        params: {
          pin1:17,
          val1:1
        }
      })
      .then(function (response) {
        console.log(response);
        //localStorage.setItem("sala", "off");
        getFunc();
        ons.notification.toast('sala desligada',{timeout: 1500});
      })
      .catch(function (error) {
        console.log(error);
        ons.notification.toast('Erro ao desligar sala',{timeout: 1500});
      })
    }
    if(localStorage.getItem("sala")=="on"){
    axios.get(localStorage.getItem("ip")+'/gpio/set', {
        params: {
          pin1:17,
          val1:0
        }
      })
      .then(function (response) {
        console.log(response);
        //localStorage.setItem("sala", "on");
        getFunc();
        ons.notification.toast('sala ligada',{timeout: 1500});
      })
      .catch(function (error) {
        console.log(error);
        
        ons.notification.toast(error,{timeout: 1500});
      })
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

//getFunc();
};

window.fn.pop = function() {
var content = document.getElementById('myNavigator');
content.popPage();
};