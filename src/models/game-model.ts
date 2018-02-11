export class GameModel {

    public GameID: number;
    public GameName: string;
    public MinimumPlayers: number;
    public MaximumPlayers: number;
    public GameType: string;
    public MinimumDuration: number;
    public MaximumDuration: number;
    public Owner: string;
    public Image1: string;    
    public Image2: string;
    public Image3: string;
    public Image4: string;
    public Image5: string;
    // get Image1Name(): string { return this.GameName + "Image1.png"; }           // fraglich, ob das funktioniert (+".png"). quelle:http://ngcordova.com/docs/plugins/fileTransfer/
    // get Image2Name(): string { return this.GameName + "Image2.png"; }  
    // get Image3Name(): string { return this.GameName + "Image3.png"; }  
    // get Image4Name(): string { return this.GameName + "Image4.png"; }  
    // get Image5Name(): string { return this.GameName + "Image5.png"; }  
    public Image1Name: string;
    public Image2Name: string;
    public Image3Name: string;
    public Image4Name: string;
    public Image5Name: string;
    public Image1ImageUrl: string;
    
    public Description: string = "blablabla";
    public Deleted: boolean

    constructor() 
    { }
}