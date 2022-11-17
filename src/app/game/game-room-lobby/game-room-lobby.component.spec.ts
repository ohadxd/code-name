import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomLobbyComponent } from './game-room-lobby.component';

describe('GameRoomLobbyComponent', () => {
  let component: GameRoomLobbyComponent;
  let fixture: ComponentFixture<GameRoomLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomLobbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRoomLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
