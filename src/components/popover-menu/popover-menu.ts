import { Component } from '@angular/core';
import { ModalController} from 'ionic-angular';
import { GamePage } from '../../pages/game/game';

@Component({
    template: 'popover-menu.html'
})

export class PopoverMenu{

    constructor(public modalController: ModalController ){

    }

    NewGameClick(){
        let newGameModal = this.modalController.create(GamePage);
    }
}