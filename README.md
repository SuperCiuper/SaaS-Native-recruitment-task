# SaaS-Native-recruitment-task

Zadanie zrealizowane na proces rekrutacyjny do SaaS-Native

## How to run

Install before running:

- Node v18.3.0
- npm 8.11.0

### Server

```sh
  cd server
  npm install
  npm start
```

Default address is http://localhost:3001

### Frontend (React)

Install before running:

```sh
  cd frontend
  npm install
  npm start
```

Default address is http://localhost:3000

## Task

Tematem zadania są pszczoły, gospodarka pasieczna i to, co Kubuś Puchatek lubi najbardziej, czyli miodek. A zatem do dzieła!

Pszczoły mieszkają w ulach, ule tworzą pasieki. Celem zadania jest stworzenie prostego, internetowego rejestru pasiek. Oto lista funkcji aplikacji:

1. Ekran dodawania nowej pasieki. Każda pasieka ma nazwę, datę dodania oraz numer. W dalszej części zadania opisany jest algorytm generowania numeru.
2. Ekran listy pasiek z możliwością sortowania po numerze pasieki oraz filtrowania po dacie dodania (zakres dat)
3. API do dodawania nowej pasieki
4. API do pobierania listy pasiek

Numer pasieki (16 cyfr) składa się z:

- Daty dodania pasieki w formacie YYYYMMDD
- Dodatkowego 5 cyfrowego numeru, zaczynającego się od 00001 w danym dniu. Dodatkowy numer domyślnie generowany jest automatycznie, jednak istnieje możliwość
  podania go przez pszczelarza - taki numer na życzenie, przykładowo 12345
- Sumy kontrolnej, będącej kolejno 2, 7 i ostatnią cyfrą iloczynu numeru bez sumy kontrolnej oraz kolejnych cyfr tego samego numeru. Jeśli cyfra jest zerem, nie
  bierzemy jej do obliczania iloczynu.

Przykładowe prawidłowe numery pasiek to:

- 2022060900002708 (2022060900002\*2\*2\*2\*6\*9\*2 = 1747060617601728, druga cyfra to 7, siódma cyfra to 0 a ostatnia to 8 )
- 2022060912987852

Dodatkowe założenia:

1. Aplikacja powinna być łatwa do uruchomienia na środowisku developerskim.
2. Aplikacja musi działać na najnowszej wersji Google Chrome.
3. Nie trzeba implementować dodatkowych funkcji typu logowanie.
4. Użycie bazy danych nie jest wymagane. Dane mogą być przechowywane w pamięci.

## Disclaimer

Ten projekt można rozwijać i ulepszać jeszcze długo, jednak uważam, że główna jego część jest skończona. Zdecydowałem się używać tylko własnoręcznie pisanych
komponentów, aby pokazać jak piszę kod, normalnie sugerowałbym wykorzystanie bootstrapowych elementów, osobiście preferuję Primereact.
