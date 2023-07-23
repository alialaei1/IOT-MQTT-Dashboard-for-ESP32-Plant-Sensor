function Lux_Log_fun(label, data, ctx1) {
    new Chart(ctx1, {
        type: 'line',
        data: {
            datasets: [{
                data: data,
                lineTension: 0.3,
                backgroundColor: "#f3cf31",
                borderColor: "black",
                pointRadius: 5,
                pointBackgroundColor: "#f3cf31",
                pointBorderColor: "black",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "#f3cf31",
                pointHoverBorderColor: "black",
                pointHitRadius: 10,
                pointBorderWidth: 2,
            }],
            labels: label

        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        },


    });
}

function Humidity_Log_fun(label, data, ctx2) {
    new Chart(ctx2, {
        type: 'line',
        data: {
            datasets: [{
                data: data,
                lineTension: 0.3,
                backgroundColor: "#46d4ff",
                borderColor: "black",
                pointRadius: 5,
                pointBackgroundColor: "#46d4ff",
                pointBorderColor: "black",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "#46d4ff",
                pointHoverBorderColor: "black",
                pointHitRadius: 10,
                pointBorderWidth: 2,
            }],
            labels: label
        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        },

    });
}

function Temperature_Log_fun(label, data, ctx3) {
    new Chart(ctx3, {
        type: 'line',
        data: {
            datasets: [{
                data: data,
                lineTension: 0.3,
                backgroundColor: "#e90042",
                borderColor: "black",
                pointRadius: 3,
                pointBackgroundColor: "#e90042",
                pointBorderColor: "#e90042",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgb(204, 48, 48)",
                pointHoverBorderColor: "black",
                pointHitRadius: 10,
                pointBorderWidth: 2,
            }],
            labels: label

        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        },


    });
}

function SoilMoisture_Log_fun(label, data, ctx4) {
    new Chart(ctx4, {
        type: 'line',
        data: {
            datasets: [{
                data: data,
                lineTension: 0.3,
                backgroundColor: "#1895ca",
                borderColor: "black",
                pointRadius: 5,
                pointBackgroundColor: "#1895ca",
                pointBorderColor: "black",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "#1895ca",
                pointHoverBorderColor: "black",
                pointHitRadius: 10,
                pointBorderWidth: 2
            }],
            labels: label

        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        },


    });
}

function SoilTemperature_Log_fun(label, data, ctx5) {
    new Chart(ctx5, {
        type: 'line',
        data: {
            datasets: [{
                data: data,
                lineTension: 0.3,
                backgroundColor: "rgb(204, 48, 48)",
                borderColor: "black",
                pointRadius: 5,
                pointBackgroundColor: "rgb(204, 48, 48)",
                pointBorderColor: "black",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgb(204, 48, 48)",
                pointHoverBorderColor: "black",
                pointHitRadius: 10,
                pointBorderWidth: 2,
            }],
            labels: label

        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        },


    });
}

function EC_Log_fun(label, data, ctx6) {
    new Chart(ctx6, {
        type: 'line',
        data: {
            datasets: [{
                data: data,
                lineTension: 0.3,
                backgroundColor: "#26d8bd",
                borderColor: "black",
                pointRadius: 5,
                pointBackgroundColor: "#26d8bd",
                pointBorderColor: "black",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "#26d8bd",
                pointHoverBorderColor: "black",
                pointHitRadius: 10,
                pointBorderWidth: 2,
            }],
            labels: label

        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        },


    });
}
// Active Tabs Custom Color
var Lux_tab = document.getElementById("Lux_tab")
var Humidity_tab = document.getElementById("Humidity_tab")
var Temperature_tab = document.getElementById("Temperature_tab")
var SoilMoisture_tab = document.getElementById("SoilMoisture_tab")
var SoilTemperature_tab = document.getElementById("SoilTemperature_tab")
var EC_tab = document.getElementById("EC_tab")
var Total_tab = document.getElementById("Total_tab")

function ChangeTabColor(elem) {
    if (elem.id == "Lux_tab") {
        elem.style.setProperty("background-color", "#f3cf31", "important");
        Humidity_tab.className = 'nav-link'
        Temperature_tab.className = 'nav-link'
        SoilMoisture_tab.className = 'nav-link'
        SoilTemperature_tab.className = 'nav-link'
        EC_tab.className = 'nav-link'
        Total_tab.className = 'nav-link'

    } else if (elem.id == "Humidity_tab") {
        Lux_tab.style.setProperty("background-color", "white", "important");
        elem.classList.add('rh-color')
        Temperature_tab.className = 'nav-link'
        SoilMoisture_tab.className = 'nav-link'
        SoilTemperature_tab.className = 'nav-link'
        EC_tab.className = 'nav-link'
        Total_tab.className = 'nav-link'

    } else if (elem.id == "Temperature_tab") {
        elem.classList.add('tempurture-color')
        Humidity_tab.className = 'nav-link'
        Lux_tab.style.setProperty("background-color", "white", "important");
        SoilMoisture_tab.className = 'nav-link'
        SoilTemperature_tab.className = 'nav-link'
        EC_tab.className = 'nav-link'
        Total_tab.className = 'nav-link'

    } else if (elem.id == "SoilMoisture_tab") {
        elem.classList.add('rhe-color')
        Temperature_tab.className = 'nav-link'
        Humidity_tab.className = 'nav-link'
        Lux_tab.style.setProperty("background-color", "white", "important");
        SoilTemperature_tab.className = 'nav-link'
        EC_tab.className = 'nav-link'
        Total_tab.className = 'nav-link'

    } else if (elem.id == "SoilTemperature_tab") {
        elem.classList.add('ground-temp-color')
        SoilMoisture_tab.classList = 'nav-link'
        Temperature_tab.className = 'nav-link'
        Humidity_tab.className = 'nav-link'
        Lux_tab.style.setProperty("background-color", "white", "important");
        EC_tab.className = 'nav-link'
        Total_tab.className = 'nav-link'

    } else if (elem.id == "EC_tab") {
        elem.classList.add('ec-color')
        SoilMoisture_tab.classList = 'nav-link'
        Temperature_tab.className = 'nav-link'
        Humidity_tab.className = 'nav-link'
        Lux_tab.style.setProperty("background-color", "white", "important");
        SoilTemperature_tab.className = 'nav-link'
        Total_tab.className = 'nav-link'

    } else if (elem.id == "Total_tab") {
        elem.classList.add('primary')
        SoilMoisture_tab.classList = 'nav-link'
        Temperature_tab.className = 'nav-link'
        Humidity_tab.className = 'nav-link'
        Lux_tab.style.setProperty("background-color", "white", "important");
        SoilTemperature_tab.className = 'nav-link'
        EC_tab.className = 'nav-link'
    }
}

function total_fun(label, data1, data2, data3, data4, data5, data6, ctx7) {
    new Chart(ctx7, {
        type: 'line',
        data: {
            labels: label,
            datasets: [{
                    data: data1,
                    label: "Lux",
                    backgroundColor: "rgba(243, 207, 49,0.3)",
                    borderColor: "black",
                }, {
                    data: data2,
                    label: "RH",
                    backgroundColor: "rgba(70, 212, 255,0.3)",
                    borderColor: "black",
                }, {
                    data: data3,
                    label: "°C",
                    backgroundColor: "rgba(233, 0, 66,0.3)",
                    borderColor: "black",
                }, {
                    data: data4,
                    label: "RH",
                    backgroundColor: "rgba(24, 149, 202,0.3)",
                    borderColor: "black",
                }, {
                    data: data5,
                    label: "°C",
                    backgroundColor: "rgba(204, 48, 48,0.3)",
                    borderColor: "black",
                }, {
                    data: data6,
                    label: "EC",
                    backgroundColor: "rgba(252, 186, 3,0.3)",
                    borderColor: "black",
                }

            ]
        },
    })
}