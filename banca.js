let saldo = 0;
let tasche = 1000;
let cooldownGiornali = false;
let cooldownErba = false;
let cooldownVendi = false;
let cooldownLava = false;
let zaino = false;
let bicicletta = false;
let licenza_venditore = false;
let bancarella = false;
let taglia_erba = false;
let oggetti = false;
let straccio = false;
let bicicletta_elettrica = false;
let licenzaFabbrica = false;
let livelloFabbrica = 0;
let guadagnoFabbrica = 0;
let tempoProduzione = 1000; // 1 secondo di produzione

// Funzione per comprare la licenza della fabbrica
function compraLicenza() {
    if (tasche >= 4000) {
        tasche -= 4000;
        licenzaFabbrica = true;
        aggiornaFabbricaUI();
        alert("Hai comprato la licenza per la fabbrica!");
        abilitaUpgrade(1);
        aggiornaProduzione(); // AVVIA LA PRODUZIONE
    } else {
        alert("❌ Non hai abbastanza soldi per comprare la licenza!");
    }
    aggiornaUI();
}


// Funzione per upgrade della fabbrica
function upgradeFabbrica(livello) {
    let costo;
    switch (livello) {
        case 1:
            costo = 1200;
            
            break;
        case 2:
            costo = 3200;
            
            break;
        case 3:
            costo = 6500;
            
            break;
        case 4:
            costo = 25000;
            
            
            break;
    }

    if (tasche >= costo) {
        tasche -= costo;
        if (costo == 1200) {
            guadagnoFabbrica = 20;
            abilitaUpgrade(2)
        }
        if (costo == 3200) {
            guadagnoFabbrica = 50;
            abilitaUpgrade(3)
        }
        if (costo == 6500) {
            guadagnoFabbrica = 100;
            abilitaUpgrade(4)
        }
        if (costo == 25000) {
            guadagnoFabbrica = 500;
            
        }
        livelloFabbrica = livello;
        aggiornaFabbricaUI();
        alert(`Fabbrica aggiornata a livello ${livello}! Produzione: $${guadagnoFabbrica} al secondo`);
        aggiornaProduzione();
    } else {
        alert("❌ Non hai abbastanza soldi per l'upgrade!");
    }
    aggiornaUI();
}

// Funzione per abilitare gli upgrade
function abilitaUpgrade(number) {
    if (licenzaFabbrica) {
        document.getElementById("upgrade"+number).disabled = false;
    }
    aggiornaUI();
}

// Funzione per aggiornare l'UI della fabbrica
function aggiornaFabbricaUI() {
    document.getElementById("saldo").textContent = saldo;
    document.getElementById("livello").textContent = livelloFabbrica;
    document.getElementById("produzione").textContent = guadagnoFabbrica + "$ al secondo";
    aggiornaUI();
}

// Funzione per aggiornare la produzione
let intervalloProduzione = null;

function aggiornaProduzione() {
    if (intervalloProduzione !== null) return; // già in funzione

    intervalloProduzione = setInterval(() => {
        if (guadagnoFabbrica > 0) {
            saldo += guadagnoFabbrica;
            aggiornaFabbricaUI();
        }
    }, tempoProduzione);
}


// Mostra saldo all'avvio
aggiornaFabbricaUI();



function deposito() {
    let importo = Number(document.getElementById("importo").value);
    if (!isNaN(importo)) {
        if (importo <= tasche) {
            saldo += importo;
            tasche -= importo;
        }
        else {
            alert("❌ Non hai abbastanza soldi!");
        }
        
        aggiornaUI();
    }
    
}

function prelievo() {
    let importo = Number(document.getElementById("importo").value);
    if (!isNaN(importo)) {
        if (importo <= saldo) {
            saldo -= importo;
            tasche += importo;
        }
        else {
            alert("❌ Non hai abbastanza soldi!");
        }
        
        aggiornaUI();
    }
}

function mostraSaldo() {
    document.getElementById("saldo").textContent = saldo;
}
function mostraTasche() {
    document.getElementById("tasche").textContent = tasche;
}

function consegnaGiornali() {
    let cd_diminuito_g = 15000
    if (bicicletta == true) {
        cd_diminuito_g = 5000
    }
    if (bicicletta_elettrica == true) {
        cd_diminuito_g = 2000
    }
    const btn = document.querySelector("button[onclick='consegnaGiornali()']");

    if (cooldownGiornali) {
        alert("⏳ Devi aspettare prima di consegnare di nuovo i giornali!");
        return;
    }
    tasche += 50
    aggiornaUI();
    alert("hai guadagnato $50!")
    cooldownGiornali = true;
    btn.disabled = true;
    btn.textContent = "Aspetta " + cd_diminuito_g/1000 + "s";
    setTimeout(() => {
        cooldownGiornali = false;
        btn.disabled = false;
        btn.textContent = "📬 Consegna Giornali (+50$)";
    }, cd_diminuito_g); 
    
}
function tagliaErba() {
    let guadagno = 100
    if (taglia_erba == true) {
        guadagno = 200
    }
    let cd_diminuito_e = 30000
    if (zaino == true) {
        cd_diminuito_e = 15000
    }
    const btn = document.querySelector("button[onclick='tagliaErba()']");
    if (cooldownErba) {
        alert("⏳ Devi aspettare prima di tagliare di nuovo l'erba!");
        return;
    }

    tasche += guadagno
    aggiornaUI();
    alert("hai guadagnato $" + guadagno + "!")
    cooldownErba = true;
    btn.disabled = true;
    btn.textContent = "Aspetta " + cd_diminuito_e/1000 + "s";
    setTimeout(() => {
        cooldownErba = false;
        btn.disabled = false;
        btn.textContent = "🌿 Taglia l'erba (+100$)";
    }, cd_diminuito_e); 
    
}
function aggiornaUI() {
    mostraSaldo();
    mostraTasche();
}
function compra(element) {
    if (element == 'zaino') {
        if (tasche >= 500) {
            tasche -= 500
            let li = document.createElement("li");
            li.textContent = "zaino";
            document.getElementById("inventario").appendChild(li);
            zaino = true
            alert("hai acquistato uno zaino!")

        }
        else {
            alert("❌ Non hai abbastanza soldi!")
        }
    }
    if (element == 'bicicletta') {
        if (tasche >= 1200) {
            tasche -= 1200
            let li = document.createElement("li");
            li.textContent = "bicicletta";
            document.getElementById("inventario").appendChild(li);
            bicicletta = true
            alert("hai acquistato una bicicletta!")
            

        }
        else {
            alert("❌ Non hai abbastanza soldi!")
        }
    }
    if (element == 'licenza_venditore') {
        if (tasche >= 1500) {
            tasche -= 1500
            let li = document.createElement("li");
            li.textContent = "licenza venditore";
            document.getElementById("inventario").appendChild(li);
            licenza_venditore = true
            alert("hai acquistato una licenza da venditore!")

        }
        else {
            alert("❌ Non hai abbastanza soldi!")
        }
    }
    if (element == 'bancarella') {
        if (tasche >= 2500) {
            tasche -= 2500
            let li = document.createElement("li");
            li.textContent = "bancarella";
            document.getElementById("inventario").appendChild(li);
            bancarella = true
            alert("hai acquistato una bancarella!")
        }
        else {
            alert("❌ Non hai abbastanza soldi!")
        }
    }
    if (element == 'tagliaerba') {
        if (tasche >= 1000) {
            tasche -= 1000;
            let li = document.createElement("li");
            li.textContent = "tagliaErba";
            document.getElementById("inventario").appendChild(li);
            taglia_erba = true;
            alert("hai acquistato un tagliaerba!");
        }
        else {
            alert("❌ Non hai abbastanza soldi!");
        }
    }
    if (element == 'oggetti') {
        if (tasche >= 400) {
            tasche -= 400;
            let li = document.createElement("li");
            li.textContent = "oggetti da vendere";
            document.getElementById("inventario").appendChild(li);
            oggetti = true;
            alert("hai acquistato degli oggetti da vendere!");
        }
        else {
            alert("❌ Non hai abbastanza soldi!");
        }
    }
    if (element == 'straccio') {
        if (tasche >= 200) {
            tasche -= 200;
            let li = document.createElement("li");
            li.textContent = "straccio";
            document.getElementById("inventario").appendChild(li);
            straccio = true;
            alert("hai acquistato uno straccio!");
        }
        else {
            alert("❌ Non hai abbastanza soldi!");
        }
    }
    if (element == 'bicicletta elettrica') {
        if (tasche >= 2000) {
            tasche -= 2000;
            let li = document.createElement("li");
            li.textContent = "bicicletta elettrica";
            document.getElementById("inventario").appendChild(li);
            bicicletta_elettrica = true;
            alert("hai acquistato una bicicletta elettrica!");
        }
        else {
            alert("❌ Non hai abbastanza soldi!");
        }
    }
    aggiornaUI();
}
function giocoDazzardo() {
    let scommessa = Number(document.getElementById("scommessa").value);
    if (scommessa < 0) {
        alert("non puoi scommettere meno di 0")
        return;
    }
    if (scommessa > tasche) {
        alert("non hai abbastanza soldi!");
        return;
    }
    let decisione = Math.random();
    if (decisione <= 0.5) {
        tasche -= scommessa;
        alert("hai perso $" + scommessa);
    }
    if (decisione > 0.5) {
        tasche += scommessa;
        alert("hai vinto $" + scommessa*2);
    }
    aggiornaUI();
    
}
function vendi() {
    let guadagno_v = 300;
    if (oggetti == true) {
        guadagno_v = 500
    }
    if (licenza_venditore == false) {
        alert("non hai la licenza da venditore! la devi comprare prima!");
        return;
    }
    let cd_diminuito_v = 60000
    if (bancarella == true) {
        cd_diminuito_v = 30000
    }
    const btn = document.querySelector("button[onclick='vendi()']");
    if (cooldownVendi) {
        alert("⏳ Devi aspettare prima di vendere di nuovo!");
        return;
    }

    tasche += guadagno_v
    aggiornaUI();
    alert("hai guadagnato $" + guadagno_v + "!");
    cooldownVendi = true;
    btn.disabled = true;
    btn.textContent = "Aspetta " + cd_diminuito_v/1000 + "s";
    setTimeout(() => {
        cooldownVendi = false;
        btn.disabled = false;
        btn.textContent = "🛍️ Vendi (+300$)";
    }, cd_diminuito_v); 

}
function lava_auto() {
    let guadagno_a = 120;
    if (straccio == false) {
        alert("non hai uno straccio! devi comprarlo prima!");
        return;
    }
    let cd_diminuito_a = 10000
    
    const btn = document.querySelector("button[onclick='lava_auto()']");
    if (cooldownLava) {
        alert("⏳ Devi aspettare prima di vendere di nuovo!");
        return;
    }

    tasche += guadagno_a
    aggiornaUI();
    alert("hai guadagnato $" + guadagno_a + "!");
    cooldownLava = true;
    btn.disabled = true;
    btn.textContent = "Aspetta " + cd_diminuito_a/1000 + "s";
    setTimeout(() => {
        cooldownLava = false;
        btn.disabled = false;
        btn.textContent = "🚿 Lava auto (+120$)";
    }, cd_diminuito_a); 

}

let aziende = [
    { nome: "Minecraft Inc.", prezzo: 100, possedute: 0 , cambio: 0},
    { nome: "EnderTech", prezzo: 300, possedute: 0, cambio: 0 },
    { nome: "Panini FC", prezzo: 200, possedute: 0, cambio: 0 },
    { nome: "Micrsoft", prezzo: 1000, possedute: 0, cambio: 0 },
    { nome: "Tesla (absolutely real)", prezzo: 800, possedute: 0, cambio: 0 },
];

function mostraAziende() {
    let container = document.getElementById("azioniContainer");
    container.innerHTML = "";

    aziende.forEach((azienda, index) => {
        let div = document.createElement("div");
        div.innerHTML = `
            <strong>${azienda.nome}</strong><br>
            Prezzo: $${azienda.prezzo}<br>
            Azioni possedute: ${azienda.possedute}<br>
            <button onclick="compraAzione(${index})">Compra</button>
            <button onclick="vendiAzione(${index})">Vendi</button>
            <input type="number" placeholder="quanto vuoi vendere/comprare?" id="sell_buy_number${index}"></input>
            Ultima variazione: ${azienda.cambio}
            <hr>
        `;
        container.appendChild(div);
    });

    aggiornaUI();
}

function compraAzione(index) {
    let azienda = aziende[index];
    if (Number(document.getElementById("sell_buy_number" + index).value) < 0) {
        alert("non puoi comprare un numero negativo di azioni!")
    }
    if (tasche >= azienda.prezzo*Number(document.getElementById("sell_buy_number" + index).value)) {
        tasche -= azienda.prezzo*Number(document.getElementById("sell_buy_number" + index).value);
        azienda.possedute += Number(document.getElementById("sell_buy_number" + index).value);
    } else {
        alert("Non hai abbastanza soldi!");
    }
    mostraAziende();
    aggiornaUI();
}

function vendiAzione(index) {
    let azienda = aziende[index];
    if (Number(document.getElementById("sell_buy_number" + index).value) < 0) {
        alert("non puoi vendere un numero negativo di azioni!")
    }
    if (azienda.possedute >= Number(document.getElementById("sell_buy_number" + index).value)) {
        azienda.possedute -= Number(document.getElementById("sell_buy_number" + index).value);
        tasche += azienda.prezzo*Number(document.getElementById("sell_buy_number" + index).value);
    } else {
        alert("Non hai azioni da vendere!");
    }
    mostraAziende();
    aggiornaUI();
}
function aggiornaPrezzi() {
    aziende.forEach(azienda => {
        // Cambia prezzo casualmente tra -5 e +5
        let variazione = Math.floor(Math.random() * 151) - 65;
        azienda.prezzo += variazione;
        if (variazione > 0) {
            azienda.cambio = "+" + variazione
        }
        else {
            azienda.cambio = variazione
        }
       
        // Evitiamo prezzi negativi
        if (azienda.prezzo < 1) azienda.prezzo = 1;
    });

    mostraAziende(); // aggiorna la visualizzazione
    aggiornaUI();
}
setInterval(aggiornaPrezzi, 10000);
// Avvia l’interfaccia all’inizio
mostraAziende();


// All'avvio, mostra le aziende
mostraAziende();

// Mostra saldo iniziale all’avvio
aggiornaUI();
