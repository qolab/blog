---
title: Základy knižnice Vuex
author: Viliam Žigo
date: '2021-02-21'
hero: media/header.png
---

# Prečo sa zaujímať o Vuex?

Aby sme vedeli odpovedať na túto otázku musíme najprv vedieť čo Vuex vôbec je. Vuex je knižnica pre Vue.js aplikácie, ktorá sa zaoberá tzv. state manažmentom aplikácie. Zmysel má hlavne v stredných a väčších webových aplikáciach, ktoré sa skladajú z väčšieho počtu komponentov. Tieto komponenty potrebujú vo väčšine prípadov medzi sebou komunikovať. V čistom Vue.js je táto komunikácia vyriešená pomocou "props" (parent to child) a "events" (child to parent). No, ak máme veľa komponentov, tak prístup cez props a events sa stáva neprehľadný. To môže spôsobiť veľa opakujúceho sa kódu a chýb. Takže presne to, čo nechceme. Vuex ponúka riešenie tohto problému. Výhoda Vuex-u je jeho integrácia v priehliadačoch s oficiálnym Vue devtools rozšírením, kde si okrem počiatočného a aktuálneho stavu vieme pri debuggovaní doslova cestovať v čase a zvoliť si hociktorý zo stavov, ktoré aplikácia mala.

# Ako to funguje?

Vuex predstavuje niečo ako centrálne úložisko pre premenné, tzv "store". Predstavme si to ako globálny object alebo nejakú key-value databázu, kde máme uložený stav ("state"), svojich premenných, ku ktorým vieme pristupovať z celej aplikácie. Vysvetlíme si, ako so store pracovať na jednoduchom príklade. Predstavme si, že máme vytvoriť jednoduchú aplikáciu pre kníhkupectvo, v ktorej budú môcť filtrovať knihy pomocou nejakých parametrov. O knihách vieme nasledujúce informácie: názov, počet kusov, cena a stav (na sklade, vypredané, atď.). Tento príklad budeme demonštrovať na jednoduchej Vue.js aplikácii, ktorú si predom inicializujeme a nainštalujeme do nej knižnicu Vuex.

## State

 Najprv musíme v `src/store/` vytvoriť súbor `index.js`, v ktorom nastavíme náš základný state, z ktorého budeme vychádzať. Majme pre začiatok 5 kníh. Knihy sa oplatí mať v store, pretože k nim budeme chcieť pravdepodobne pristupovať vo viacerých častiach aplikácie aj keď sa bude aplikácia rozširovať.

```jsx
// index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [
      { id: 1, title: '', publisher: '', price: 12.99, status: 'in-stock'},
      { id: 2, title: '', publisher: '', price: 6.99, status: 'sold-out'},
      { id: 3, title: '', publisher: '', price: 25.99, status: 'in-stock'},
      { id: 4, title: '', publisher: '', price: 17.99, status: 'comming-soon'},
      { id: 5, title: '', publisher: '', price: 14.99, status: 'sold-out'},
    ],
  },
});
```

To by sme mali. Informácie o knihách budeme zobrazovať v jednoduchej tabuľke s filtrom podla stavu. Taktiež vytvoríme možnosť pre administrátora, editovať stav knihy v tabuľke. Pre jednoduchosť použijeme pre templating knižnicu bootstrap-vue. Na to, aby sme mohli dáta zobraziť musíme tieto dáta získať zo store. Na pristupovanie k premenným v store sa využívajú "getters". Tie nám dovoľujú jednoducho pristúpiť, ku každej premmennej v store. Predtým, ako nám takýto getter vráti obsah premennej, o ktorý ho žiadame, vieme tento obsah modifikovať a získať len časť, ktorú potrebujeme.

## Getters

V aplikácii budeme potrebovať, getter pre získanie kníh podľa zadaného filtra. Ten by mohol vyzerať nasledovne:

```jsx
//index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [
      { id: 1, title: '', publisher: '', price: 12.99, status: 'in-stock'},
      ...,
      { id: 5, title: '', publisher: '', price: 14.99, status: 'sold-out'},
    ],
  },
  getters: {
    getBooks: (state) => (filter) => {
      if (filter) {
        return state.books.filter((book) => book.status === filter);
      }

      return state.books;
    }
  },
});
```

Pri getteroch sú dôležité dve veci. Vždy príjíma ako argument state a vždy musí niečo returnovať. Je to akási alternatíva ku computed properties vo Vue komponente avšak, k tejto metóde vieme pristupovať z celej aplikácie. Stačí, ak v komponente využijeme helper z vuex-u a pridáme potrebné premenné do časti computed.

```jsx
// import helperu
import { mapGetters } from 'vuex';

export default {
  // ...
    
  // v computed premenných využijeme helper,
  // ktorý nám zavolá getter v store
  computed: {
    ...mapGetters(['getBooks']),
  }
};
```

Teraz už môžeme v aplikácii zobrazovať a filtrovať knihy podľa stavov. Ďalej by sme potrebovali knihy editovať. Keby sme nepoužívali vuex, tak by sme niečo takéto robili pravdepodobne pomocou využitia metódy. Alternatíva metód v store sú takzvané mutácie alebo mutations.

## Mutations

Mutácie dovoľujú meniť (mutovať) stav premenných uložených v store. V našom prípade využijeme mutáciu na zmenu stavu knihy. Tá by mohla vyzerať nejako takto:

```jsx
// index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // ...

  mutations: {
    setStatus(state, payload) {
      let book = state.books.find((book) => book.id === payload.id);
      book.status = payload.status;
    },
  },
});
```

Mutáciu rovnako ako getter a state pridáme v store. V našom prípade je to mutácia setStatus, ktorá prijíma dva argumenty. Prvý je vždy aktuálny state a druhý jepayload, ktorý je voliteľný. Využívame ho, ak chceme do našej mutácie posunúť nejaké dáta. My ako si ukážeme budeme predávať id knihy a nový status. Podľa tohto id nájdeme knihu a zmeníme jej status na nový. Opäť však musíme túto mutáPociu impotovať do komponentu, aby sme ju mohli zavolať.

```jsx
// import helperu
import { mapMutation } from 'vuex';

export default {
  //...

  methods: {
    ...mapMutations(['setStatus']);

    //...
  }
};
```

Po importe môžeme s touto mutáciou ďalej pracovať ako s obyčajnou metódou, pričom ako argument použijeme objekt našej knihy. Máme teda alternatívu aj k metódam, avšak nie je to také jednoduché, pretože mutácie nemôžu obsahovať asynchrónny kód a niekedy práve to potrebujeme. Napríklad, ak by sme zmenu stavu potrebovali odoslať do externého systému. Preto existujú takzvané actions alebo akcie.

## Actions

Aj keď sú na prvý pohľad mutáciam podobné, existujú tri rozdiely medzi akciou a mutáciou:

1. Actions môžu obsahovať asynchrónne operácie, mutations nie
2. Actions miesto mutovania state-u commitujú mutácie
3. Actions sa dispatchujú, mutations commitujú

Ukážeme to na našom príklade. Vytvoríme jednoduchú akciu update, ktorá nám commitne mutáciu setStatus. To by mohlo vyzerať nejako takto:

```jsx
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // ...

  actions: {
    update(context, payload) {
      context.commit('setStatus', payload);
    },
  },
});
```

Ako môžeme vidieť, akcia prijíma ako prvý argument celý context, v ktorom sa nachádza. My však nepotrebujeme celý context, takže môžeme z neho vybrať len metódu commit a naša akcia sa zmení na nasledujúci tvar.

```jsx
update({ commit }, payload) {
  commit('setStatus', payload);
},
```

Pre zaujímavosť, context obsahuje aj state, getters a všetko uvedené nižšie:

```jsx
{
  state,      // same as store.state, or local state if in modules
  rootState,  // same as store.state, only in modules
  commit,     // same as store.commit
  dispatch,   // same as store.dispatch
  getters,    // same as store.getters, or local getters if in modules
  rootGetters // same as store.getters, only in modules
}
```

Teraz potrebujeme ešte upraviť náš komponent aby namiesto mutácie dispatchol našu akciu. Na to môžeme opäť použiť helper mapActions, ktorý nám vuex ponúka. Všimnime si, že tento helper je opäť v methods. Jeho použitie je opäť veľmi jednoduché.

```jsx
import { mapActions } from 'vuex';

export default {
  // ...

  methods: {
    ...mapActions(['update']),

    // ...
  },
};
```

## Modules

Pri zložitejších aplikáciach sa môže stať, že potrebujete uložiť do state a mutovať veľké množstvo premenných. Aby v tom nevznikol neporiadok, dajú sa jednoduché časti rozdeliť do takzvaných modules. Každý modul môže obsahovať svoj vlastný state, gettery, mutácie a akcie. Avšak vždy budeme potrebovať aj takzvaný rootModule, v ktorom sme pracovali doteraz. Predstavte si to, že by sme do našej aplikácie chceli pridať okrem kníh aj časopisy a kalendáre. Funkcie by boli podobné, avšak štruktúra dát by sa môže byť odlišná. Aby sme nemali veľmi dlhé súbory a aby sa nám nepomiešali jednotlivé produkty, je rozumné rozdeliť tieto produkty do samostatných modulov. Následne tieto moduly zjednotíme v našom rootModule nasledovne.

```jsx
const store = new Vuex.Store({
  modules: {
    book: moduleBook,
    journal: moduleJournal,
    calendar: moduleCalendar
  }
})
```

Následne sa dostaneme k údajom takýmto spôsobom:

```jsx
store.state.journal // -> state v moduleJournal
store.state.book.status // -> status knihy v moduleBook
```

## Záver

Celú aplikáciu môžete nájsť v priloženom sandboxe:

<iframe src="https://codesandbox.io/embed/vuex-example-4qxz7?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vuex-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Užitočné odkazy

- [Oficiálna dokumentácia Vuex](https://vuex.vuejs.org/installation.html)