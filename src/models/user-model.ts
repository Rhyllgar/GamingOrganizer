import { GameModel } from './game-model';

export class UserModel{
    public Name: string;
    public Email: string;
    public FavoriteGames: GameModel[];
    public Role:RolesEnumeration;
}

export enum RolesEnumeration {
    // optimal wäre es, die Berechtigungen zahlenmäßig zu hierarchisieren, da dann Abfragen mit "role <= RolesEnumeration.ADDGAMES" gemacht werden könnten
    ADMIN,  // Hat alle Rechte
    ADDGAMES, // Kann Spiele hinzufügen

    NORMALPLAYER // Spielerprofil ablegen& Co., Spieleliste (Favoirten), Teilnahme an Spieleabende etc. pp.
    
}

