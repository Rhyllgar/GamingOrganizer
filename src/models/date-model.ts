import { UserModel } from './user-model';
import { GameModel } from './game-model';
import * as moment from 'moment' 

export class DateModel {
    public TheDate;
    public TheDateHtml;
    public TheLocation;
    public TheTime;
    public TheGames:GameModel[];
    public ThePlayers:UserModel[];
    public DateId;
}