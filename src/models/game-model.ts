export class GameModel {

    public GameID: number;
    public GameName: string;
    public MinimumPlayers: number;
    public MaximumPlayers: number;
    public GameType: string;
    public MinimumDuration: number;
    public MaximumDuration: number;
    public Owner: string;
    public Image1: any;
    public Image2: any;
    public Image3: any;
    public Image4: any;
    public Image5: any;
    public Description: string = "lala";
    public Deleted: boolean

    constructor() 
    { }
}