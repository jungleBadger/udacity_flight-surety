
import DOM from './dom';
import Contract from './contract';
import './flightsurety.css';


(async() => {

    let result = null;

    let STATUS_CODES = [{
        "label": "STATUS_CODE_UNKNOWN",
        "code": 0
    }, {
        "label": "STATUS_CODE_ON_TIME",
        "code": 10
    }, {
        "label": "STATUS_CODE_LATE_AIRLINE",
        "code": 20
    }, {
        "label": "STATUS_CODE_LATE_WEATHER",
        "code": 30
    }, {
        "label": "STATUS_CODE_LATE_TECHNICAL",
        "code": 40
    }, {
        "label": "STATUS_CODE_LATE_OTHER",
        "code": 50
    }];

    let contract = new Contract('localhost', () => {
        // Read transaction
        contract.isOperational((error, result) => {
            contract.flights.forEach(flight => {
                displayList(flight, DOM.flightSelector)
            });
            display('Operational Status', 'Check if contract is operational', [ { label: 'Operational Status', error: error, value: result} ]);
        });


        contract.flightSuretyApp.events.FlightStatusInfo({
            fromBlock: "latest"
        }, function (error, result) {
            if (error) {
                console.log(error)
            } else {
                console.log("Flight status info received");
                console.log(result.returnValues);
                let els = document.querySelectorAll(`.${ btoa(result.returnValues.timestamp + result.returnValues.flight)}`);
                console.log(els[els.length - 1]);
                els[els.length - 1].querySelector(".results").innerText = result.returnValues.status === "10" ? "10 - On time" : `${result.returnValues.status} - ${STATUS_CODES.find(code => code.code == result.returnValues.status).label}`;
            }
        });


        contract.flightSuretyData.events.CreditInsured({
            fromBlock: "latest"
        }, function (error, result) {
            if (error) {
                console.log(error)
            } else {
                alert(`Account ${result.returnValues.passenger} got refunded ${result.returnValues.amount} regarding flight ${result.returnValues.flight}`);
            }
        });



        // User-submitted transaction
        DOM.elid('submit-oracle').addEventListener('click', () => {
            // I know this manipulation is not safe nor recommended, but it just to make it to work now
            let flight = JSON.parse(document.querySelector('#flights-selector').value);
            // Write transaction
            contract.fetchFlightStatus(flight, (error, result) => {
                display('Oracles', 'Trigger oracles', [ { label: 'Fetch Flight Status', error: error, value: result.flight + ' ' + `Requested at ${new Date().toLocaleString()}`} ], btoa(result.timestamp + result.flight));
            });
        });

        // User-submitted transaction
        DOM.elid('buyInsurance').addEventListener('click', () => {
            // I know this manipulation is not safe nor recommended, but it just to make it to work now
            let flight = JSON.parse(document.querySelector('#flights-selector').value);

            contract.buy({
                "flight": flight.flight
            }, (error, result) => {
                alert(error || result);
            });
        });
    
    });
    

})();

function displayList(flight, parentEl) {
    console.log(flight);
    console.log(parentEl);
    let el = document.createElement("option");
    el.text = `${flight.flight} - ${new Date((flight.timestamp))}`;
    el.value = JSON.stringify(flight);
    parentEl.add(el);
}

function display(title, description, results, customClass = null) {
    let displayDiv = DOM.elid("display-wrapper");
    let section = DOM.section();
    section.appendChild(DOM.h2(title));
    section.appendChild(DOM.h5(description));
    results.map((result) => {
        let row = section.appendChild(DOM.div({className:'row ' + customClass}));
        row.appendChild(DOM.div({className: 'col-sm-3 field'}, result.label));
        row.appendChild(DOM.div({className: 'col-sm-7 field-value'}, result.error ? String(result.error) : String(result.value)));
        row.appendChild(DOM.div({className: 'col-sm-2 results'}, customClass ? "Fetching status" : ""));
        section.appendChild(row);
    });
    displayDiv.append(section);

}







