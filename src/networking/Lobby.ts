/**
 *  
 * Lobby.js
 *
 *  License: Apache 2.0
 *  author:  Ciar�n McCann
 *  url: http://www.ciaranmccann.me/
 */

///<reference path="../gui/LobbyMenu.ts"/>
///<reference path="../Game.ts"/>
///<reference path="Client.ts"/>
///<reference path="Events.ts"/>
///<reference path="GameLobby.ts"/>

// Had to give up the benfits of types in this instance, as a problem with the way ES6 proposal module system
// works with Node.js modules. http://stackoverflow.com/questions/13444064/typescript-conditional-module-import-export
try
{
    var GameLobby = require('./GameLobby');
    var Events = require('./Events');
} catch (e){}

class Lobby
{
    gameLobbies;
    menu: LobbyMenu;

    constructor ()
    {
        this.gameLobbies = [];
        this.menu = new LobbyMenu(this);
    }

    //Setup the lobby, and connections to the Node server. 
    init()
    {
        Client.connectionToServer(Settings.NODE_SERVER_IP, Settings.NODE_SERVER_PORT);
        GameInstance.gameType = Game.types.ONLINE_GAME;
    }

    createGameLobby(name, numberOfPlayers)
    {
        this.gameLobbies.push(new GameLobby(" random "));
        Client.socket.emit(Events.lobby.CREATE_GAME_LOBBY, { "name": name, "nPlayers": numberOfPlayers });
    }

    joinGameLobby(lobbyName: string)
    {
        // displayMessage saying waiting on x players
        this.menu.displayMessage(" Waitting on 2 more players.... ");
        Client.socket.emit(Events.client.JOIN_GAME_LOBBY, lobbyName);
    }

    joinQuickGame(lobbyName: string)
    {
        // FIND a game quick that is waitting on a player

        Client.socket.emit(Events.client.JOIN_GAME_LOBBY, lobbyName);
    }

    client_updateAllLobbies(lobbies)
    {
        this.menu.updatelobbies(lobbies);
    }

}