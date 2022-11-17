import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {collection, updateDoc} from "@angular/fire/firestore";
import {json} from "stream/consumers";


interface GameData {
  admin: string;
  hints: number;
  players: string[];
  players_in_room: number;
  turnOf: string;
  round: number;
  roles: {
    blue_spymaster: string;
    red_spymaster: string;
    red_detective: string;
    blue_detective: string;
  }
}
@Injectable({providedIn: 'root'})

export class GameService {

  wordsList: string[] = [];
  cards: Subject<String[]> = new Subject<[]>();
  hints: number;
  guessedCards: Number[] = [];
  gameStarted: boolean = false;
  gamesList:  Subject<{name: string, players: number}[]> = new Subject<{name: string, players: number}[] | null>();
  roomName: string = 'default'
  itemDoc: AngularFirestoreDocument<GameData>;
  roleDoc : AngularFirestoreDocument;
  constructor(private db: AngularFirestore , private user: AuthService ) {

  }

  createGameRoom(room:string) {

    let createRoom: AngularFirestoreDocument = this.db.collection(`game_rooms`).doc(room);
    createRoom.set({

      admin: this.user.userData.uid,
      hints: 0,
      players_in_room:1,
      round: 0,
      turnOf: '',
      players: [this.user.userData.uid],
      roles: {
        blue_spymaster:'',
        red_spymaster:'',
        red_detective:'',
        blue_detective:''
      }
    }).then(() => {
      console.log("game role settings created");
    }).catch(e =>{
      console.log(e)
    });
    let rolesCreate: AngularFirestoreCollection = this.db.collection('game_rooms').doc(room).
    collection('role');
    rolesCreate.add({
      blue_spymaster:'',
      red_spymaster:'',
      red_detective:'',
      blue_detective:''
    }).then(() => {
      console.log("game roles settings created");
    }).catch(e =>{
      console.log(e)
    });
  }

  deleteRoom(room: string) {
    this.itemDoc = this.db.collection(`game_rooms`).doc(room);
    this.itemDoc.delete().then(() => {console.log(`The room ${room} was deleted successfully`)
    }).catch((e) => {
      console.log(e)
    })
  }
  getCards() {
    //Watch over the list length so the while loop will be on track
    //unfortunately the while loop can't track the increment of .length in the loop like: while(array.length < n)
    let wordListLength = 0;

    //Fetch the words list
    this.db.doc<string[]>('words').valueChanges().subscribe(data => {

      // for the random Math function
      let length = data[0].length;

      while (wordListLength < 25) {

        //its common knowledge to know what it supposed to do
        // choosing random 25 words from the db for the cards
        let random = Math.floor(Math.random() * length);

        if (this.wordsList.indexOf(data[0][random]) === -1) {
          this.wordsList.push(data[0][random]);
        }
        wordListLength = this.wordsList.length;
      }
      //WEnd
      this.cards.next(this.wordsList);
    });

  }

  fetchGameRoomsList() {
    // Retrieve rooms list from the database to observable
    let gameRooms: {name: string, players: number}[] = [];
    const snapshot = this.db.collection(`game_rooms`).get();
    snapshot.subscribe(data => {
     data.forEach( doc => {
       let gameRoom: GameData = doc.data() as GameData;
       gameRooms.push({name: doc.id, players:(doc.data() as GameData).players_in_room})
     });
     this.gamesList.next(gameRooms);
      console.log(gameRooms);
    });

  }

  joinGameRoom(roomName: string) {
    // this.db.object(`game_rooms/${roomName}/in_game/players_in_room`)
    //   .query.ref.transaction(players_in_room => {
    //   return players_in_room +1;
    // }).then(() => {
    //   console.log('You have been joined the room');
    // }).catch(()=> {
    //   console.log('unexpected error occurred on game_rooms');
    // });
    // this.db.object(`games_list/${roomName}/players_in_room`)
    //   .query.ref.transaction(players_in_room => {
    //   return players_in_room +1;
    // }).then(() => {
    //   console.log('every one see it!');
    // }).catch(()=> {
    //   console.log('unexpected error occurred on games_list on player increment');
    // });
    this.db.doc<string[]>(`game_rooms/${roomName}/in_game/players`).get().subscribe(data => {

      let playersList: string[] = [];

      if (data != null) {
        console.log(JSON.stringify(data).slice(1,length-1));
        playersList.push(JSON.stringify(data).slice(1,length-1));
      }
      playersList.push(this.user.userData.uid);
      console.log(playersList);

      this.db.doc(`game_rooms/${roomName}/in_game/players`).set(playersList).then();
    });
  }

  takeRole(role: string) {
    let setRole = {};
    switch (role) {
      case 'redS': {
        setRole = {'roles.red_spymaster': this.user.userData.uid};
        break;
      }
      case 'blueS': {
        setRole = {'roles.blue_spymaster': this.user.userData.uid};
        break;
      }
      case 'redD': {
        setRole = {'roles.blue_detective': this.user.userData.uid};
        break;
      }
      case 'blueD': {
        setRole = {'roles.red_detective': this.user.userData.uid};
        break;
      }
    }


    this.roleDoc = this.db.collection('game_rooms').doc(this.roomName);
    console.log(JSON.stringify(this.roleDoc.ref.path));
    this.roleDoc.update(setRole).then(() => {
      console.log('role set');
      console.log(setRole);
    }).catch(e => {
      console.log(e);
    });
  }
  quitGame() {

  }

  saveGameRecords() {

  }

  gameRoomDataStream() {

  }

  gameSettings() {

  }

  giveHint() {

  }

  guess(cardIndex: Number) {
    if (this.guessedCards.length >= this.hints) {
      return;
    } else
      this.guessedCards.push(cardIndex);
  }

  confirmTurnChoice() {

  }
}

