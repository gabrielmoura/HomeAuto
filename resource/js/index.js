if (ons.platform.isIPhoneX()) { // Utility function
    // Add empty attribute to the <html> element
    document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
}

if (ons.platform.isIPhoneX()) { // Utility function
    // Add empty attribute to the <html> element
    document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
}
/**
 * Iniciar
 */
ons.ready(function () {
    if (localStorage.getItem("ip") === null) {
        myNavigator.pushPage('setup.html');
    }
});

/**
 * Eventos
 */
document.addEventListener('dragdown', function(event) {
    if (event.target.matches('#card_cozinha')||event.target.matches('#card_sala')) {
        getFunc();
        console.log('getFunc')
    }
    if (event.target.matches('#card_info')) {
        getInfo();
        setInfo();
    }
});
document.addEventListener('doubletap', function(event) {
    if (event.target.matches('#card_cozinha')||event.target.matches('#card_sala')) {
        getFunc();
        console.log('getFunc')
    }
    if (event.target.matches('#card_info')) {
        getInfo();
        setInfo();
    }
});
/**
 * Rotas
 */
document.addEventListener('init', function (event) {

    /*if (localStorage.getItem("ip") === null) {
        //document.querySelector('#myNavigator').pushPage('setup.html', {data: {title: 'Auto'}});
        document.querySelector('#myNavigator').pushPage('setup.html', {data: {title: 'Setup'}});
    }*/

    var page = event.target;
    if (page.id === 'setup') {
        if (localStorage.getItem('ip') != null) {
            document.querySelector('#ipshow').innerText = 'Ip definido: ' + localStorage.getItem('ip');
        }

        page.querySelector('#go-to-main').onclick = function () {
            // Store in localStorage

            setIP(document.querySelector('#ip').value);
            //getFunc();
            document.querySelector('#myNavigator')
                .resetToPage('index.html', {data: {title: 'Auto'}})
                .then(getFunc());

        };
    } else if (page.id === 'setup-return') {
        page.querySelector('#go-to-main').onclick = function () {
            // Store in localStorage
            //localStorage.setItem("ip",document.getElementById('ip').value);
            //localStorage.setItem("sub",document.getElementById('sub').value);
            setIP(document.getElementById('ip').value);
            //getFunc();
            document.querySelector('#myNavigator').pushPage('index.html', {data: {title: 'Auto'}});
        };
        page.querySelector('#go-cancel').onclick = function () {
            document.querySelector('#myNavigator').pushPage('index.html', {data: {title: 'Auto'}});
        };
    } else if (page.id === 'index') {
        //this.onShow  =function(){ setFunc();}
        setFunc()

    }

});


function setIP(ip) {
    localStorage.setItem("ip", 'http://' + ip)
    ons.notification.toast("IP definido", {timeout: 15000})
}

function setFunc() {
    if (localStorage.getItem('cozinha') == "on") {
        document.querySelector('#cozinha').checked = true
    } else {
        document.querySelector('#cozinha').checked = false
    }
    if (localStorage.getItem('sala') == "on") {
        document.querySelector('#sala').checked = true
    } else {
        document.querySelector('#sala').checked = false
    }
}

function getFunc() {
    axios.get(localStorage.getItem("ip") + '/gpio/list')
        .then(function (response) {
            for (i in response.data) {
                if (response.data[i].pin == 4) {
                    if (response.data[i].status == 0) {
                        localStorage.setItem("cozinha", "off");
                    } else {
                        localStorage.setItem("cozinha", "on");
                    }
                }
                if (response.data[i].pin == 17) {
                    if (response.data[i].status == 0) {
                        localStorage.setItem("sala", "off");
                    } else {
                        localStorage.setItem("sala", "on");
                    }
                }
            }
            setFunc();
        })
        .catch(function (error) {
            console.log(error);
            ons.notification.toast('Erro ao acessar dispositivo', {timeout: 1500});
        })
}

function onkitchen() {
    if (localStorage.getItem("cozinha") == "off") {
        axios.get(localStorage.getItem("ip") + '/gpio/set', {
            params: {
                pin0: 4,
                val0: 1
            }
        })
            .then(function (response) {
                console.log(response);
                //localStorage.setItem("cozinha", "off");
                getFunc();
                ons.notification.toast('Cozinha desligada', {timeout: 1500});
            })
            .catch(function (error) {
                console.log(error);
                ons.notification.toast('Erro ao desligar Cozinha', {timeout: 1500});
            })
    }
    if (localStorage.getItem("cozinha") == "on") {
        axios.get(localStorage.getItem("ip") + '/gpio/set', {
            params: {
                pin0: 4,
                val0: 0
            }
        })
            .then(function (response) {
                console.log(response);
                //localStorage.setItem("cozinha", "on");
                getFunc();
                ons.notification.toast('Cozinha ligada', {timeout: 1500});
            })
            .catch(function (error) {
                console.log(error);

                ons.notification.toast(error, {timeout: 1500});
            })
    }
}

function onliving() {
    if (localStorage.getItem("sala") == "off") {
        axios.get(localStorage.getItem("ip") + '/gpio/set', {
            params: {
                pin1: 17,
                val1: 1
            }
        })
            .then(function (response) {
                console.log(response);
                //localStorage.setItem("sala", "off");
                getFunc();
                ons.notification.toast('sala desligada', {timeout: 1500});
            })
            .catch(function (error) {
                console.log(error);
                ons.notification.toast('Erro ao desligar sala', {timeout: 1500});
            })
    }
    if (localStorage.getItem("sala") == "on") {
        axios.get(localStorage.getItem("ip") + '/gpio/set', {
            params: {
                pin1: 17,
                val1: 0
            }
        })
            .then(function (response) {
                console.log(response);
                //localStorage.setItem("sala", "on");
                getFunc();
                ons.notification.toast('sala ligada', {timeout: 1500});
            })
            .catch(function (error) {
                console.log(error);

                ons.notification.toast(error, {timeout: 1500});
            })
    }
}

function getInfo() {
    axios.get(localStorage.getItem("ip") + '/gpio/info')
        .then(function (response) {
            info = response.data;
            localStorage.setItem("hostname", info.name);
            sessionStorage.setItem("tempcpu", info.tempcpu);
            sessionStorage.setItem("memory", info.memory);
            console.log(info);


        })
        .catch(function (error) {
            console.log(error);
            ons.notification.toast('Erro ao obter informações', {timeout: 1500});
        })
}

function setInfo() {
    if (localStorage.getItem('hostname') != null) {
        document.querySelector('#hostname').innerText = 'Host: '+localStorage.getItem('hostname');
    }
    if (sessionStorage.getItem('memory') != null) {
        document.querySelector('#memory').innerText = 'Memoria: '+(sessionStorage.getItem('memory')*100)+'%';
    }
    if (sessionStorage.getItem('tempcpu') != null) {
        document.querySelector('#tempcpu').innerText = 'Temp: '+sessionStorage.getItem('tempcpu');
    }
}

window.fn = {};

window.fn.open = function () {
    var menu = document.querySelector('#menu');
    menu.open();
};

window.fn.load = function (page, data) {
    var content = document.querySelector('#myNavigator');
    var menu = document.querySelector('#menu');
    //content.pushPage(page, data);
    content.resetToPage(page, data)

};

window.fn.push = function (page, data) {
    var content = document.querySelector('#myNavigator');
    var menu = document.querySelector('#menu');
    content.pushPage(page, data);
};

/*function openURL(urlString) {
    myURL = encodeURI(urlString);
    window.open(myURL, '_blank');
}*/

window.fn.url = function (urlString) {
    myURL = encodeURI(urlString);
    window.open(myURL, '_blank');
};

window.fn.pop = function () {
    var content = document.querySelector('#myNavigator');
    content.popPage();
};