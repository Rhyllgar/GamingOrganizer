import { GameModel } from './game-model';

export class UserModel{
    public UserId: number;
    public Name: string;
    public Email: string;
    public FavoriteGames: GameModel[];
    public Role:RolesEnumeration;
}

export enum RolesEnumeration {
    // optimal wäre es, die Berechtigungen zahlenmäßig zu hierarchisieren, da dann Abfragen mit "role <= RolesEnumeration.ADDGAMES" gemacht werden könnten
    ADMIN = 0,  // Hat alle Rechte
    ADDGAMES = 100, // Kann Spiele hinzufügen
    ADDDATE = 200,  // Kann neuen Termin hinzufügen
    NORMALPLAYER = 300  // Spielerprofil anlegen& Co., Spieleliste (Favoirten), Teilnahme an Spieleabende etc. pp.
    
}

