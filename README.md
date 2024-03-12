# progetto_tecnologie_internet
CLIENT:

-inviare il pacchetto di login del tipo (nome utente + hash della password);

-eseguire il codice del gioco scelto che è stato fornito dal server.
SERVER:

-gestire un database che colleghi gli account dei giocatori ai punteggi da loro accumulati nei differenti videogiochi;

-fornire le pagine al client una volta richieste.


STRUTTURA SITO:

-pagina di login iniziale con opzione per la creazione di un account.
    dopo login:
    -pagina di visione classifiche e statistiche.
    -pagina di selezione videogioco.
        dopo selezione:
        -esecuzione videogioco con comunicazione del punteggio al server alla fine di ogni partita.

--FRONT--
PAGINA DI LOGIN:
- se hai già l'account login
    - altrimenti iscrizione

IN ENTRAMBI I CASI VAI A FINIRE NELLA PAGINA 
- scelta giochi
- visualizzazione delle classifiche

SE VIENE SCELTO UN GIOCHO (2 GIOCHI)
- si apre la pagina relativa al gioco (gestita lato client)
- quando gioco finisce
      - comunicazione risultato al server
      - try again (cerchiamo di gestirlo lato client)
      - torna al menu di selezione

--BACK--
PAGINA DI LOGIN
- prendere i dati e controllarli con il db
- creazione dell'accont con comunicazione db

SCELTA GIOCHI
-redirect alla pagina giusta del gioco
-recuperi i dati e li ordini in maniera descrescente e li mandi al client che li manda a schermo nella classifica

PAGINA GIOCO
- recuperare il risulato e salvarlo nel db corretto
- ritornare alla pagina home nel caso utente voglia smettere di giocare


--DB--
1) DB per gli account (nome hash->password)
2) DB GIOCO 1 (nome punteggio data)
3) DB PER GIOCO 2 (nome punteggio data)


--TECNOLOGIE--

front: react
back: flask
