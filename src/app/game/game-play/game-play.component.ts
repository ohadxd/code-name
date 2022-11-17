import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {

  //temporary placeholder

  cards: String[] = ['loading', 'loading', 'loading', 'loading', 'loading',
    'loading', 'loading', 'loading', 'loading', 'loading',
    'loading', 'loading', 'loading', 'loading', 'loading',
    'loading', 'loading', 'loading', 'loading', 'loading',
    'loading', 'loading', 'loading', 'loading', 'loading'];

  isGameStarted: boolean = true;
  roomName: string = '';


  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameService.roomName, this.roomName = this.route.snapshot.params['room'];
    // this.roomName = this.route.snapshot.params['room'];
    this.gameService.getCards();
    this.gameService.cards.subscribe(data => {
      this.cards = data;
    })
  }

  selectCard(cardIndex: number)
  {

  }

}
