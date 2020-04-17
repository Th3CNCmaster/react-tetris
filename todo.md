Axel
#########################


1. make index.js draw 2 extra components with fake data. The fake data will later be replaced by real data from a server.
<Login />

const players = [
    {username: "Axel"},
    {username: "Karl"}
];

<Lobby players={players}>

2. Make empty component files that draw nothing for LoginComponent.js and LobbyComponent.js

3. Make LoginComponent according to paper

4. Make LobbyComponent accorging to paper

Karl
#########################
fix so the server sends state: "Login" until we receive "login"
when we receive "login" we start sending state: "Lobby"
when we receive "start" we start and send state: "InGame"
move the websocket to index.js